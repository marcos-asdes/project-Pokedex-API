import bcrypt from 'bcrypt'
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken'
import { Request } from 'express'

import * as repository from '../repositories/auth.repository.js'

import appLog from '../events/appLog.js'
import { AppError } from '../events/appError.js'
import { CreateUser } from '../types/types.js'

function hashPassword (password: string) {
  const encrypted = bcrypt.hashSync(password, +process.env.SALT)
  appLog('Service', 'Password encrypted')
  return encrypted
}

function decryptPassword (password: string, encrypted: string) {
  const passwordIsValid = bcrypt.compareSync(password, encrypted)
  appLog('Service', 'Password decrypted')
  return passwordIsValid
}

function generateToken (id: string) {
  const data = {}
  const subject = id
  const secretKey = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN
  // jwt config
  const algorithm = process.env.JWT_ALGORITHM as Algorithm
  const config: SignOptions = { algorithm, expiresIn, subject }
  // jwt sign
  const token = jwt.sign(data, secretKey, config)
  appLog('Service', 'Token generated')
  return token
}

// export functions

// sign up services
async function findUserByEmail_expectDataIsNull(email: string) {
  const data = await repository.findByEmail(email);
  appLog('Repository', 'Repository accessed successfully')
  if (data) {
    throw new AppError(
      'Email already registered',
      409,
      'Email already registered',
      'Ensure to provide an email address that is not already in use'
    );
  };
  return appLog('Service', 'Email is available for registration')
}

async function registerUserInDatabase(body: CreateUser) {
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
async function findUserByEmail_expectDataIsntNull(email: string){
  const data = await repository.findByEmail(email);
  appLog('Repository', 'Repository accessed successfully')
  if (!data) {
    throw new AppError(
      'Email not found',
      401,
      'Email not found',
      'Ensure to provide a valid email address'
    );
  };
  appLog('Service', 'Email found')
  return data
}

function passwordIsValid(inputedPassword: string, databasePassword: string) {
  const passwordIsValid = decryptPassword(inputedPassword, databasePassword)
  if (!passwordIsValid) {
    throw new AppError(
      'Invalid password',
      401,
      'Invalid password',
      'Ensure to provide a valid password'
    )
  }
  return appLog('Service', 'Password checked')
}

function sendTokenToHeader(id: string, req: Request) {
  const token = generateToken(id)
  req.headers = { 'Authorization': 'Bearer ' + token }
  return appLog('Service', `Token stored in header as ${token}`)
}

// validateTokenMiddleware service
async function findUserById_idAsString(id: string) {
  const data = await repository.findByIdString(id);
  appLog('Repository', 'Repository accessed successfully')
  if (!data) {
    throw new AppError(
      'User not found',
      404,
      'User not found',
      'Critical Failure: The provided userId is not related to any user'
    );
  };
  appLog('Service', 'User found')
  return data;
}

export { 
  findUserByEmail_expectDataIsNull,
  registerUserInDatabase,
  findUserByEmail_expectDataIsntNull,
  passwordIsValid,
  sendTokenToHeader, 
  findUserById_idAsString
}
