import { Request, Response } from 'express'

import app from './app.js'

import appLog from './events/appLog.js'
import { doc } from './doc.js'

const PORT: Number = +process.env.PORT || 4000

app.listen(PORT, () => {
  appLog('Server', `Server listening on port ${PORT}`)
})

app.get('/', (_req: Request, res: Response) => {
  res.send(`
  Application online. 
  Server listening on port ${PORT}.
  
  ${doc}
  `)
})