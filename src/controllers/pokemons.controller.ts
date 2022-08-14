import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as service from '../services/pokemons.service.js'

async function getPokemons (_req: Request, res: Response) {
  const { subject } = res.locals // user id

  const data = await service.getAllPokemons()
  const updated_data = await service.addPokemonBooleanProp(subject, data)

  appLog('Controller', 'Successfully obtained pokemons')
  return res.status(200).send(updated_data)
}

async function postPokemonInUserCollection (_req: Request, res: Response) {
  const { id } = res.locals.pokemon_data
  const { subject } = res.locals

  await service.addPokemon(id, subject)

  appLog('Controller', 'Pokemon added to users collection successfully')
  return res.sendStatus(200)
}

async function removePokemonFromUserCollection (_req: Request, res: Response) {
  const { id } = res.locals.pokemon_data
  const { subject } = res.locals

  await service.removePokemon(id, subject)

  appLog('Controller', 'Pokemon removed from users collection successfully')
  return res.sendStatus(200)
}

export { 
  getPokemons, 
  postPokemonInUserCollection,
  removePokemonFromUserCollection
}
