import { Router } from 'express'

import * as schema from '../schemas/auth.schema.js'
import * as middleware from '../middlewares/auth.middleware.js'
import * as controller from '../controllers/auth.controller.js'

import validateSchemaMiddleware from '../middlewares/schema.middleware.js'

const authRouter = Router()

authRouter.post(
  '/sign-up',
  validateSchemaMiddleware(schema.RegisterUser),
  middleware.checkIfEmailIsAlreadyRegistered,
  controller.registerUser
)

authRouter.post(
  '/sign-in',
  validateSchemaMiddleware(schema.SignIn),
  middleware.checkIfEmailIsValid,
  middleware.checkIfPasswordIsValid,
  controller.loginUser
)

export default authRouter