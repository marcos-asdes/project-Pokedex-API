import { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'

import appLog from '../events/appLog.js'

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 60 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request): string => {
    return req.ip
  },
  handler: (_req: Request, res: Response): void => {
    appLog('Middleware', 'Too many requests')
    res.sendStatus(429).send('Too many requests')
  }
})
