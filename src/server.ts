import app from './app.js'

import appLog from './events/appLog.js'

const PORT: Number = +process.env.PORT || 4000

app.listen(PORT, () => {
  appLog('Server', `Server listening on port ${PORT}`)
})