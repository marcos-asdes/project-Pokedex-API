import { AppError } from '../events/AppError.js';
import appLog from '../events/appLog.js'

import * as repository from '../repositories/pokemons.repository.js'

async function getAllPokemons() {
  const data = await repository.getAllPokemonsInDatabase()
  appLog('Repository', 'Repository accessed successfully')
  appLog('Service', 'Data pokemons obtained from database')
  return data
}

async function findPokemonByIdNumber(id: number) {
  const data = await repository.findByIdNumber(Number(id))
  appLog('Repository', 'Repository accessed successfully')
  if (!data) {
    throw new AppError(
      'Pokemon does not exist in database',
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
  if (data.length!==0) {
    throw new AppError(
      'Pokemon already exists in user collection',
      409,
      'Pokemon already exists in user collection',
      'Add a new pokemon to the collection'
    )
  }
  return appLog('Service', 'Pokemon not yet registered in user collection')
}

async function addPokemon(id: number, subject: string) {
  await repository.addPokemonInUserCollection(id, subject)
  appLog('Repository', 'Pokemon added successfully')
}

export { 
  findPokemonByIdNumber, 
  getAllPokemons, 
  checkIfPokemonsIsAlreadyInUserCollection, 
  addPokemon 
}