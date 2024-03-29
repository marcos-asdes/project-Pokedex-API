import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import 'express-async-errors'

import router from './routes/index.js'
import { apiLimiter } from './middlewares/rateLimitMiddleware.js'
import errorHandler from './events/appError.js'

dotenv.config({ path: '.env' })

const app = express()
app.use(cors())
app.use(json())
app.use(helmet())
app.use(router)
app.use(errorHandler)
app.use(apiLimiter)

export default app
