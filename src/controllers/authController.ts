import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as service from '../services/authService.js'

import { User } from '@prisma/client'

// sign up controller
async function registerUser(_req: Request, res: Response): Promise<Response> {
  const { email, password } = res.locals.body

  await service.checkIfEmailIsAlreadyRegistered(email)

  await service.registerUserInDatabase(email, password)

  const data: string = `User ${email} has been registered successfully.`

  appLog('Controller', 'User signed up')
  return res.status(201).send(data)
}

// sign in controller
async function loginUser(req: Request, res: Response): Promise<Response> {
  const { email, password } = res.locals.body

  const user_data: User = await service.checkIfEmailIsValid(email)

  service.checkIfPasswordIsValid(password, user_data?.password)

  const token: string = await service.sendTokenToHeader(user_data?.id, req)

  const data: string = `User ${email} has successfully logged in. \n\n User token: ${token}`

  appLog('Controller', 'User signed in')
  return res.status(200).send(data)
}

export { registerUser, loginUser }
