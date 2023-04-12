import { AppError } from '../events/appError.js'
import appLog from '../events/appLog.js'
import { PokemonDataWithBoolean } from '../types/types.js'
import { Pokemon, UsersPokemons } from '@prisma/client'

import * as repository from '../repositories/pokemonsRepository.js'

async function getAllPokemons(): Promise<Pokemon[]> {
  let data = await repository.getAllPokemonsInDatabase()

  appLog('Service', 'Data pokemons obtained from database')
  return data
}

async function addPokemonBooleanProp(
  id: string,
  data: Pokemon[]
): Promise<PokemonDataWithBoolean[]> {
  const dataWithBoolean: PokemonDataWithBoolean[] = data.map(e => ({
    ...e,
    inMyPokemons: false
  }))
  dataWithBoolean.sort((a, b) => a.id - b.id)

  const pokemonsInUserCollection: UsersPokemons[] =
    await repository.selectPokemonsInUserCollection(id)

  for (const pokemon of pokemonsInUserCollection) {
    dataWithBoolean[pokemon.pokemonId - 1] = {
      ...dataWithBoolean[pokemon.pokemonId - 1],
      inMyPokemons: true
    }
  }
  appLog('Service', 'Pokemon boolean prop updated')
  return dataWithBoolean
}

async function checkIfPokemonExists(id: number): Promise<Pokemon> {
  const data: Pokemon | null = await repository.findPokemonByIdNumber(id)
  if (!data) {
    throw new AppError(
      404,
      'Pokemon does not exist in database',
      'Enter a valid pokemon id'
    )
  }
  appLog('Service', 'Pokemon found in database')
  return data
}

async function checkIfPokemonIsInUserCollection(
  pokemonId: number,
  userId: string,
  route: string
): Promise<void> {
  const data: UsersPokemons[] | undefined =
    await repository.checkIfPokemonIsInCollection(pokemonId, userId)
  const regex: RegExp = /\b(add|remove)\b/
  const match: RegExpMatchArray | null = route.match(regex)
  if (match && match[0] === 'add') {
    if (data.length !== 0) {
      throw new AppError(
        409,
        'Pokemon already exists in user collection',
        'Add a new pokemon to the collection'
      )
    }
    appLog('Service', 'Pokemon not yet registered in user collection')
  } else if (match && match[0] === 'remove') {
    if (data.length === 0) {
      throw new AppError(
        409,
        'Pokemon does not exists in user collection',
        'Remove a pokemon that exists in the collection'
      )
    }
    appLog('Service', 'Pokemon registered in user collection')
  }
}

async function addPokemon(id: number, subject: string): Promise<void> {
  await repository.addPokemonInUserCollection(id, subject)
  appLog('Service', 'Pokemon added successfully')
}

async function removePokemon(id: number, subject: string): Promise<void> {
  await repository.removePokemonFromUserCollection(id, subject)
  appLog('Service', 'Pokemon removed successfully')
}

export {
  getAllPokemons,
  addPokemonBooleanProp,
  checkIfPokemonExists,
  checkIfPokemonIsInUserCollection,
  addPokemon,
  removePokemon
}
