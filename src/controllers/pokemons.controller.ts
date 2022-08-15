import { Request, Response } from 'express'

import appLog from '../events/appLog.js'
import { DataWithBoolean } from '../types/types.js'

import * as service from '../services/pokemons.service.js'

import client from '../config/database.js'
import { popPokedex } from '../../prisma/seed.js'

async function getPokemons (_req: Request, res: Response) {
  const subject: string = res.locals.subject // user id

  // testing
  const pokedex = await client.pokemon.findMany()
  if(pokedex.length === 0) {
    await popPokedex()
  }

  const data = await service.getAllPokemons()
  const updated_data: DataWithBoolean[] = await service.addPokemonBooleanProp(subject, data)

  appLog('Controller', 'Successfully obtained pokemons')
  return res.status(200).send(updated_data)
}

async function postPokemonInUserCollection (_req: Request, res: Response) {
  const id: number = res.locals.pokemon_data.id
  const subject: string = res.locals.subject // user id

  await service.addPokemon(id, subject)

  appLog('Controller', 'Pokemon added to users collection successfully')
  return res.sendStatus(200)
}

async function removePokemonFromUserCollection (_req: Request, res: Response) {
  const id: number = res.locals.pokemon_data.id
  const subject: string = res.locals.subject // user id

  await service.removePokemon(id, subject)

  appLog('Controller', 'Pokemon removed from users collection successfully')
  return res.sendStatus(200)
}

export { 
  getPokemons, 
  postPokemonInUserCollection,
  removePokemonFromUserCollection
}
