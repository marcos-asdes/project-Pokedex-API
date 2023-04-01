import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as service from '../services/authService.js'

// sign up controller
async function registerUser(_req: Request, res: Response) {
  const body = res.locals.body

  await service.checkIfEmailIsAlreadyRegistered(body.email)

  await service.registerUserInDatabase(body)

  const email = body.email
  const data = `User ${email} was registered successfully.`

  appLog('Controller', 'User signed up')
  return res.status(201).send(data)
}

// sign in controller
async function loginUser(req: Request, res: Response) {
  const { email, password } = res.locals.body

  const user_data = await service.checkIfEmailIsValid(email)

  service.checkIfPasswordIsValid(password, user_data?.password)

  const token = await service.sendTokenToHeader(user_data?.id, req)

  const data = `User ${email} has successfully logged in. \n\n User token: ${token}`

  appLog('Controller', 'User signed in')
  return res.status(200).send(data)
}

export { registerUser, loginUser }
