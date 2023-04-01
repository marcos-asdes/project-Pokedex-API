import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as service from '../services/authService.js'

// sign up controller
async function registerUser(_req: Request, res: Response) {
  const body = res.locals.body

  await service.checkIfEmailIsAlreadyRegistered(body.email)

  await service.registerUserInDatabase(body)

  const user = body.email

  const data = `User ${user} has been registered successfully.`

  appLog('Controller', 'User signed up')
  return res.status(201).send(data)
}

// sign in controller
function loginUser(req: Request, res: Response) {
  const id: string = res.locals.user_data.id
  const user: string = res.locals.user_data.email

  const token = service.sendTokenToHeader(id, req)

  const data = `User ${user} has successfully logged in. \n\n User token: ${token}`

  appLog('Controller', 'User signed in')
  return res.status(200).send(data)
}

export {
  registerUser,
  loginUser
}
