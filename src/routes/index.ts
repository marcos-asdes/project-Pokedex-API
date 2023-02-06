import express from 'express'

import authRouter from './auth.router.js'
import pokemonsRouter from './pokemons.router.js'

const router = express.Router()

const api = '/api'

router.use(api, authRouter)
router.use(api, pokemonsRouter)

export default router
