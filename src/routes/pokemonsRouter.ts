import { Router } from 'express'

import * as controller from '../controllers/pokemonsController.js'

import validateTokenMiddleware from '../middlewares/tokenMiddleware.js'

const pokemonsRouter = Router()

pokemonsRouter.use(validateTokenMiddleware)

pokemonsRouter.get('/pokemons', controller.getPokemons)

pokemonsRouter.post(
  '/my-pokemons/:id/add',
  controller.postPokemonInUserCollection
)

pokemonsRouter.post(
  '/my-pokemons/:id/remove',
  controller.removePokemonFromUserCollection
)

export default pokemonsRouter
