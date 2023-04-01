import { Request, Response } from 'express'

import appLog from '../events/appLog.js'
import { PokemonDataWithBoolean } from '../types/types.js'

import * as service from '../services/pokemonsService.js'

async function getPokemons(_req: Request, res: Response) {
  const subject: string = res.locals.subject // user id

  const data = await service.getAllPokemons()
  const updated_data: PokemonDataWithBoolean[] =
    await service.addPokemonBooleanProp(subject, data)

  appLog('Controller', 'Successfully obtained pokemons')
  return res.status(200).send(updated_data)
}

async function postPokemonInUserCollection(_req: Request, res: Response) {
  const id: number = res.locals.pokemon_data.id
  const subject: string = res.locals.subject // user id
  const pokemon_name: string = res.locals.pokemon_data.name

  await service.addPokemon(id, subject)

  const data = `The ${pokemon_name} has been successfully added to your Pokedex.`

  appLog('Controller', 'Pokemon added to users collection successfully')
  return res.status(200).send(data)
}

async function removePokemonFromUserCollection(_req: Request, res: Response) {
  const id: number = res.locals.pokemon_data.id
  const subject: string = res.locals.subject // user id
  const pokemon_name: string = res.locals.pokemon_data.name

  await service.removePokemon(id, subject)

  const data = `The ${pokemon_name} has been successfully removed from your Pokedex.`

  appLog('Controller', 'Pokemon removed from users collection successfully')
  return res.status(200).send(data)
}

export {
  getPokemons,
  postPokemonInUserCollection,
  removePokemonFromUserCollection
}
