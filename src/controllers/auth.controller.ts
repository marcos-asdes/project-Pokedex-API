import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as service from '../services/auth.service.js'

// sign up controller
async function registerUser(_req: Request, res: Response) {
  const body = res.locals.body

  await service.registerUserInDatabase(body)

  appLog('Controller', 'User signed up')
  return res.sendStatus(201)
}

// sign in controller
function loginUser(req: Request, res: Response) {
  const id: string = res.locals.user_data.id

  const token = service.sendTokenToHeader(id, req)

  const data = `System generated token. \n\n Token: ${token}`

  appLog('Controller', 'User signed in')
  return res.status(200).send(data)
}

export {
  registerUser,
  loginUser
}
