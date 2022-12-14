import { Request, Response, NextFunction } from 'express'

import appLog from '../events/appLog.js'
import { User } from '../types/types.js'

import * as service from '../services/auth.service.js'

// sign up middleware
async function checkIfEmailIsAlreadyRegistered (_req: Request, res: Response, next: NextFunction) {
  const email: string = res.locals.body.email

  await service.findUserByEmail_expectDataIsNull(email)

  appLog('Middleware', 'Email is available for registration')
  next()
}

// sign in middlewares
async function checkIfEmailIsValid (_req: Request, res: Response, next: NextFunction) {
  const email: string = res.locals.body.email

  const user_data = await service.findUserByEmail_expectDataIsntNull(email)

  res.locals.user_data = user_data
  appLog('Middleware', 'Valid email')
  next()
}

async function checkIfPasswordIsValid (_req: Request, res: Response, next: NextFunction) {
  const password: string = res.locals.body.password
  const user_data: User = res.locals.user_data

  service.passwordIsValid(password, user_data?.password)

  appLog('Middleware', 'Valid password')
  next()
}

export { 
  checkIfEmailIsAlreadyRegistered, 
  checkIfEmailIsValid, 
  checkIfPasswordIsValid 
}
