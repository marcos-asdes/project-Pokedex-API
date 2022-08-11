import { Router } from 'express'

import * as controller from '../controllers/pokemons.controller.js'

import validateTokenMiddleware from '../middlewares/token.middleware.js'

const pokemonsRouter = Router()

pokemonsRouter.get(
  '/pokemons',
  validateTokenMiddleware,
  controller.getPokemons
)

export default pokemonsRouter