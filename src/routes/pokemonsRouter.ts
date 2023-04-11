import { Router } from 'express'

import * as middleware from '../middlewares/pokemonsMiddleware.js'
import * as controller from '../controllers/pokemonsController.js'

import validateTokenMiddleware from '../middlewares/tokenMiddleware.js'
import { routeEvent } from '../events/routeEvent.js'

const pokemonsRouter = Router()

pokemonsRouter.use(routeEvent)
pokemonsRouter.use(validateTokenMiddleware)

pokemonsRouter.get('/pokemons', controller.getPokemons)

pokemonsRouter.post(
  '/my-pokemons/:id/add',
  middleware.checkIfPokemonExists,
  middleware.checkIfPokemonsIsAlreadyInCollection,
  controller.postPokemonInUserCollection
)

pokemonsRouter.post(
  '/my-pokemons/:id/remove',
  middleware.checkIfPokemonExists,
  middleware.checkIfPokemonsIsInCollection,
  controller.removePokemonFromUserCollection
)

export default pokemonsRouter
