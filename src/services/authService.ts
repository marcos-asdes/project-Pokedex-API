import bcrypt from 'bcrypt'
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken'
import { Request } from 'express'

import * as repository from '../repositories/authRepository.js'

import appLog from '../events/appLog.js'
import { AppError } from '../events/appError.js'
import { User } from '@prisma/client'

function hashPassword(password: string): string {
  if (process.env.SALT) {
    const encrypted: string = bcrypt.hashSync(password, +process.env.SALT)
    appLog('Service', 'Password encrypted')
    return encrypted
  } else {
    throw new AppError(
      500,
      'SALT environment variable not found',
      'Insert the environment variable SALT in .env file'
    )
  }
}

function decryptPassword(password: string, encrypted: string): boolean {
  const passwordIsValid: boolean = bcrypt.compareSync(password, encrypted)
  appLog('Service', 'Password decrypted')
  return passwordIsValid
}

function generateToken(id: string): string {
  const data = {}
  const subject: string = id
  if (
    process.env.JWT_SECRET &&
    process.env.JWT_EXPIRES_IN &&
    process.env.JWT_ALGORITHM
  ) {
    const secretKey: string = process.env.JWT_SECRET
    const expiresIn: string = process.env.JWT_EXPIRES_IN
    // jwt config
    const algorithm = process.env.JWT_ALGORITHM as Algorithm
    const config: SignOptions = { algorithm, expiresIn, subject }
    // jwt sign
    const token: string = jwt.sign(data, secretKey, config)
    appLog('Service', 'Token generated')
    return token
  } else {
    throw new AppError(
      500,
      'JWT environment variables not found',
      'Insert the environment variables JWT_SECRET, JWT_EXPIRES_IN and JWT_ALGORITHM in .env file'
    )
  }
}

// export functions

// sign up services
async function checkIfEmailIsAlreadyRegistered(email: string): Promise<void> {
  const data: User | null = await repository.findUserByEmail(email)
  if (data) {
    throw new AppError(
      409,
      'Email already registered',
      'Ensure to provide an email address that is not already in use'
    )
  }
  appLog('Service', 'Email is available for registration')
}

async function registerUserInDatabase(
  email: string,
  password: string
): Promise<void> {
  const hashedPassword = hashPassword(password)

  await repository.registerUser(email, hashedPassword)
  appLog('Service', 'User registered in the database')
}

// sign in services
async function checkIfEmailIsValid(email: string): Promise<User> {
  const data: User | null = await repository.findUserByEmail(email)
  if (!data) {
    throw new AppError(
      401,
      'Email not found',
      'Ensure to provide a valid email address'
    )
  }
  appLog('Service', 'Email found in database')
  return data
}

function checkIfPasswordIsValid(
  inputedPassword: string,
  databasePassword: string
): void {
  const passwordIsValid: boolean = decryptPassword(
    inputedPassword,
    databasePassword
  )
  if (!passwordIsValid) {
    throw new AppError(
      401,
      'Invalid password',
      'Ensure to provide a valid password'
    )
  }
  appLog('Service', 'Password checked')
}

async function sendTokenToHeader(id: string, req: Request): Promise<string> {
  const token: string = generateToken(id)
  req.headers = { Authorization: 'Bearer ' + token }
  appLog('Service', `Token stored in header as ${token}`)
  return token
}

export {
  checkIfEmailIsAlreadyRegistered,
  registerUserInDatabase,
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  sendTokenToHeader
}
