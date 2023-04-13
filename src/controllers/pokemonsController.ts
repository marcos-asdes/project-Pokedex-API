import { Request, Response } from 'express'

import appLog from '../events/appLog.js'
import { PokemonDataWithBoolean } from '../types/types.js'

import * as service from '../services/pokemonsService.js'

import { Pokemon } from '@prisma/client'

async function getPokemons(_req: Request, res: Response): Promise<Response> {
  const subject: string = res.locals.subject // user id

  const data: Pokemon[] = await service.getAllPokemons()

  const updated_data: PokemonDataWithBoolean[] =
    await service.addPokemonBooleanProp(subject, data)

  appLog('Controller', 'Successfully obtained pokemons')
  return res.status(200).send(updated_data)
}

async function postPokemonInUserCollection(
  req: Request,
  res: Response
): Promise<Response> {
  const subject: string = res.locals.subject // user id
  const route: string = req.url
  const { id } = req.params
  const pokemonId = Number(id)

  const pokemonData: Pokemon = await service.checkIfPokemonExists(pokemonId)
  const pokemonName: string = pokemonData.name

  await service.checkIfPokemonIsInUserCollection(pokemonId, subject, route)

  await service.addPokemon(pokemonId, subject)

  const data = `The ${pokemonName} has been successfully added to your Pokedex.`

  appLog(
    'Controller',
    `Pokemon ${pokemonName} added to users collection successfully`
  )
  return res.status(200).send(data)
}

async function removePokemonFromUserCollection(
  req: Request,
  res: Response
): Promise<Response> {
  const subject: string = res.locals.subject // user id
  const route: string = req.url
  const { id } = req.params
  const pokemonId = Number(id)

  const pokemonData: Pokemon = await service.checkIfPokemonExists(pokemonId)
  const pokemonName: string = pokemonData.name

  await service.checkIfPokemonIsInUserCollection(pokemonId, subject, route)

  await service.removePokemon(pokemonId, subject)

  const data = `The ${pokemonName} has been successfully removed from your Pokedex.`

  appLog(
    'Controller',
    `Pokemon ${pokemonName} removed from users collection successfully`
  )
  return res.status(200).send(data)
}

export {
  getPokemons,
  postPokemonInUserCollection,
  removePokemonFromUserCollection
}
