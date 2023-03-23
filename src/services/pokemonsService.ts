import { AppError } from '../events/appError.js'
import appLog from '../events/appLog.js'
import { PokemonDataWithBoolean } from '../types/types.js'
import { Pokemon } from '@prisma/client'
import { popPokedex } from '../../prisma/seed.js'

import * as repository from '../repositories/pokemonsRepository.js'

async function getAllPokemons() {
  let data = await repository.getAllPokemonsInDatabase()
  appLog('Repository', 'Repository accessed successfully')

  if (data.length === 0) {
    await popPokedex()
    data = await repository.getAllPokemonsInDatabase()
    appLog('Repository', 'Populated pokemon table')
  }

  appLog('Service', 'Data pokemons obtained from database')
  return data
}

async function addPokemonBooleanProp(id: string, data: Pokemon[]) {
  const dataWithBoolean: PokemonDataWithBoolean[] = data.map((e) => ({ ...e, inMyPokemons: false }))
  dataWithBoolean.sort((a, b) => (a.id - b.id))

  const pokemonsInUserCollection = await repository.selectPokemonsInUserCollection(id)
  appLog('Repository', 'Repository accessed successfully')

  for (let i = 0; i < pokemonsInUserCollection.length; i++) {
    dataWithBoolean[pokemonsInUserCollection[i].pokemonId - 1] =
      { ...dataWithBoolean[pokemonsInUserCollection[i].pokemonId - 1], inMyPokemons: true }
  }
  appLog('Service', 'Pokemon boolean prop updated')
  return dataWithBoolean
}

async function findPokemonByIdNumber(id: number) {
  const data = await repository.findByIdNumber(Number(id))
  appLog('Repository', 'Repository accessed successfully')
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

async function checkIfPokemonsIsAlreadyInUserCollection(pokemonId: number, userId: string) {
  const data = await repository.checkIfPokemonsIsAlreadyInCollectionWithIds(pokemonId, userId)
  appLog('Repository', 'Repository accessed successfully')
  if (data.length !== 0) {
    throw new AppError(
      409,
      'Pokemon already exists in user collection',
      'Add a new pokemon to the collection'
    )
  }
  return appLog('Service', 'Pokemon not yet registered in user collection')
}

async function addPokemon(id: number, subject: string) {
  await repository.addPokemonInUserCollection(id, subject)
  appLog('Repository', 'Repository accessed successfully')
  return appLog('Service', 'Pokemon added successfully')
}

async function checkIfPokemonsIsInUserCollection(pokemonId: number, userId: string) {
  const data = await repository.checkIfPokemonsIsAlreadyInCollectionWithIds(pokemonId, userId)
  appLog('Repository', 'Repository accessed successfully')
  if (data.length === 0) {
    throw new AppError(
      409,
      'Pokemon does not exists in user collection',
      'Remove a pokemon that exists in the collection'
    )
  }
  return appLog('Service', 'Pokemon registered in user collection')
}

async function removePokemon(id: number, subject: string) {
  await repository.removePokemonFromUserCollection(id, subject)
  appLog('Repository', 'Repository accessed successfully')
  return appLog('Service', 'Pokemon removed successfully')
}

export {
  getAllPokemons,
  addPokemonBooleanProp,
  findPokemonByIdNumber,
  checkIfPokemonsIsAlreadyInUserCollection,
  addPokemon,
  checkIfPokemonsIsInUserCollection,
  removePokemon
}