import { Request, Response, NextFunction } from 'express'

import { AppError } from '../events/appError.js'
import appLog from '../events/appLog.js'

import * as repository from '../repositories/auth.repository.js'
import * as service from '../services/auth.service.js'

/* export type userProperties = {
  id: number;
  email: string;
  password: string;
} */

async function checkIfDataIsAlreadyRegistered (_req: Request, res: Response, next: NextFunction) {
  const body = res.locals.body
  const { email } = body

  const data = await repository.findByEmail(email)
  appLog('Repository', 'User searched by email')
  if (data) {
    throw new AppError(
      'Email already registered',
      409,
      'Email already registered',
      'Ensure to provide an email address that is not already in use'
    )
  }
  appLog('Middleware', 'Email is unique')
  next()
}

async function checkUserIsValid (_req: Request, res: Response, next: NextFunction) {
  const body = res.locals.body
  const { email, password } = body

  const userAlreadyExists = await repository.findByEmail(email)
  if (!userAlreadyExists) {
    throw new AppError(
      'User not found',
      401,
      'User not found',
      'Ensure to provide a valid email address'
    )
  }
  appLog('Middleware', 'User exists')

  const passwordIsValid = service.decryptPassword(password, userAlreadyExists?.password)
  if (!passwordIsValid) {
    throw new AppError(
      'Invalid password',
      401,
      'Invalid password',
      'Ensure to provide a valid password'
    )
  }
  appLog('Middleware', 'Valid password')

  res.locals.user = userAlreadyExists
  return next()
}

export { checkIfDataIsAlreadyRegistered, checkUserIsValid }
