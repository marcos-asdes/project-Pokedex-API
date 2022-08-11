import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as repository from '../repositories/auth.repository.js'
import * as service from '../services/auth.service.js'

async function registerUser (_req: Request, res: Response) {
  const body = res.locals.body
  const password = service.hashPassword(body.password)
  const data = { 
    email: body.email,
    password: password
  }
  await repository.registerUser(data)
  appLog('Repository', 'User instance inserted')

  appLog('Controller', 'User signed up')
  return res.sendStatus(201)
}

function loginUser (_req: Request, res: Response) {
  const { user: { id } } = res.locals

  const token = service.generateToken(id)

  appLog('Controller', 'User signed in')
  return res.status(200).send({ token })
}

export { registerUser, loginUser }