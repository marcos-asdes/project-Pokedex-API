/* import { Router } from 'express'

import * as controller from '../controllers/pokemons.controller.js'

import { validateSchemaMiddleware } from '../middlewares/token.middleware.js'

const pokemonsRouter = Router()

pokemonsRouter.get(
  '/pokemons',
  validateTokenMiddleware(schema.ValidateToken),
  controller.getPokemons
)

export default pokemonsRouter */