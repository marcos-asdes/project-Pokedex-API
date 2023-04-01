import { Request, Response, NextFunction } from 'express'

import appLog from '../events/appLog.js'
import { User } from '@prisma/client'

import * as service from '../services/authService.js'

// sign in middlewares
async function checkIfEmailIsValid(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const email: string = res.locals.body.email

  const user_data = await service.findUserByEmail_expectDataIsntNull(email)

  res.locals.user_data = user_data
  appLog('Middleware', 'Valid email')
  next()
}

async function checkIfPasswordIsValid(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const password: string = res.locals.body.password
  const user_data: User = res.locals.user_data

  service.passwordIsValid(password, user_data?.password)

  appLog('Middleware', 'Valid password')
  next()
}

export { checkIfEmailIsValid, checkIfPasswordIsValid }
