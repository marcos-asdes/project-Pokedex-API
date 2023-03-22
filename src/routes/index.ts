import express from 'express'

import authRouter from './authRouter.js'
import pokemonsRouter from './pokemonsRouter.js'

const router = express.Router()

const api = '/api'

router.use(api, authRouter)
router.use(api, pokemonsRouter)

export default router
