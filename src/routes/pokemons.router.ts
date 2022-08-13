import { Router } from 'express'

import * as middleware from '../middlewares/pokemons.middleware.js'
import * as controller from '../controllers/pokemons.controller.js'

import validateTokenMiddleware from '../middlewares/token.middleware.js'

const pokemonsRouter = Router()

pokemonsRouter.get(
  '/pokemons',
  validateTokenMiddleware,
  controller.getPokemons
)

pokemonsRouter.post(
  '/my-pokemons/:id/add',
  validateTokenMiddleware,
  middleware.checkIfPokemonExists,
  middleware.checkIfPokemonsIsAlreadyInCollection,
  controller.postPokemonInUserCollection
)

export default pokemonsRouter