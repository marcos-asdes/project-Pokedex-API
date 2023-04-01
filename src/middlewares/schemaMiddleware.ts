import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

import { AppError } from '../events/appError.js'
import appLog from '../events/appLog.js'

export default function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body

    const { error } = schema.validate(body, { abortEarly: false })
    if (error) {
      throw new AppError(
        400,
        'Invalid input',
        error.details.map(e => e.message).join(', ')
      )
    }

    res.locals.body = body
    appLog('Middleware', 'Schema validated')
    next()
  }
}
