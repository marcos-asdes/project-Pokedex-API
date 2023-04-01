import { Router } from 'express'

import * as schema from '../schemas/authSchema.js'
import * as controller from '../controllers/authController.js'

import validateSchemaMiddleware from '../middlewares/schemaMiddleware.js'
import { routeEvent } from '../events/routeEvent.js'

const authRouter = Router()

authRouter.use(routeEvent)

authRouter.post(
  '/sign-up',
  validateSchemaMiddleware(schema.RegisterUser),
  controller.registerUser
)

authRouter.post(
  '/sign-in',
  validateSchemaMiddleware(schema.SignIn),
  controller.loginUser
)

export default authRouter
