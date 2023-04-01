import bcrypt from 'bcrypt'
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken'
import { Request } from 'express'

import * as repository from '../repositories/authRepository.js'

import appLog from '../events/appLog.js'
import { AppError } from '../events/appError.js'
import { CreateUser } from '../types/types.js'
import { User } from '@prisma/client'

function hashPassword(password: string) {
  if (process.env.SALT) {
    const encrypted = bcrypt.hashSync(password, +process.env.SALT)
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

function decryptPassword(password: string, encrypted: string) {
  const passwordIsValid = bcrypt.compareSync(password, encrypted)
  appLog('Service', 'Password decrypted')
  return passwordIsValid
}

function generateToken(id: string) {
  const data = {}
  const subject = id
  if (
    process.env.JWT_SECRET &&
    process.env.JWT_EXPIRES_IN &&
    process.env.JWT_ALGORITHM
  ) {
    const secretKey = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRES_IN
    // jwt config
    const algorithm = process.env.JWT_ALGORITHM as Algorithm
    const config: SignOptions = { algorithm, expiresIn, subject }
    // jwt sign
    const token = jwt.sign(data, secretKey, config)
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
  const data: User | null = await repository.findByEmail(email)
  appLog('Repository', 'Repository accessed successfully')
  if (data) {
    throw new AppError(
      409,
      'Email already registered',
      'Ensure to provide an email address that is not already in use'
    )
  }
  appLog('Service', 'Email is available for registration')
}

async function registerUserInDatabase(body: CreateUser): Promise<void> {
  const password = hashPassword(body.password)
  const data = {
    email: body.email,
    password: password
  }
  await repository.registerUser(data)
  appLog('Repository', 'Repository accessed successfully')
  return appLog('Service', 'User registered in the database')
}

// sign in services
async function findUserByEmail_expectDataIsntNull(email: string) {
  const data = await repository.findByEmail(email)
  appLog('Repository', 'Repository accessed successfully')
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

function passwordIsValid(inputedPassword: string, databasePassword: string) {
  const passwordIsValid = decryptPassword(inputedPassword, databasePassword)
  if (!passwordIsValid) {
    throw new AppError(
      401,
      'Invalid password',
      'Ensure to provide a valid password'
    )
  }
  return appLog('Service', 'Password checked')
}

function sendTokenToHeader(id: string, req: Request) {
  const token = generateToken(id)
  req.headers = { Authorization: 'Bearer ' + token }
  appLog('Service', `Token stored in header as ${token}`)
  return token
}

// validateTokenMiddleware service
async function findUserById_idAsString(id: string) {
  const data = await repository.findByIdString(id)
  appLog('Repository', 'Repository accessed successfully')
  if (!data) {
    throw new AppError(
      404,
      'User not found',
      'Critical Failure: The provided userId is not related to any user'
    )
  }
  appLog('Service', 'User found in database')
  return data
}

export {
  checkIfEmailIsAlreadyRegistered,
  registerUserInDatabase,
  findUserByEmail_expectDataIsntNull,
  passwordIsValid,
  sendTokenToHeader,
  findUserById_idAsString
}
