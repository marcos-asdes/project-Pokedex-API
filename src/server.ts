import { Request, Response } from 'express'

import app from './app.js'
import { connectToDatabase } from './config/database.js'

import appLog from './events/appLog.js'

let PORT: number
if (process.env.PORT) {
  PORT = +process.env.PORT
} else {
  PORT = 5000
}

app.listen(PORT, () => {
  appLog('Server', `Server listening on port ${PORT}`)
})

app.get('/', (_req: Request, res: Response) => {
  res.send(`
  Application online. 
  Server listening on port ${PORT}.
  `)
})

connectToDatabase()
