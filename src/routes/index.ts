import express from 'express'

import authRouter from './auth.router.js'
import pokemonsRouter from './pokemons.router.js'

const router = express.Router()

router.use(authRouter)
router.use(pokemonsRouter)

export default router
