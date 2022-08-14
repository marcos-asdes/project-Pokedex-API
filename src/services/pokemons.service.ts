import { AppError } from '../events/AppError.js';
import appLog from '../events/appLog.js'

import * as repository from '../repositories/pokemons.repository.js'

async function getAllPokemons() {
  const data = await repository.getAllPokemonsInDatabase()
  appLog('Repository', 'Repository accessed successfully')
  appLog('Service', 'Data pokemons obtained from database')
  return data
}

async function addPokemonBooleanProp(id: string, data: any) {
  const dataWithBoolean = data.map((e: any) => ({...e, inMyPokemons: false}))
  dataWithBoolean.sort((a: any, b: any) => (a.id - b.id))
  
  const pokemonsInUserCollection = await repository.selectPokemonsInUserCollection(id)
  appLog('Repository', 'Repository accessed successfully')

  for(let i=0; i<pokemonsInUserCollection.length; i++) {
    dataWithBoolean[pokemonsInUserCollection[i].pokemonId - 1] = 
    {...dataWithBoolean[pokemonsInUserCollection[i].pokemonId - 1], inMyPokemons: true}
  }
  appLog('Service', 'Pokemon boolean prop updated')
  return dataWithBoolean
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
  appLog('Repository', 'Repository accessed successfully')
  return appLog('Service', 'Pokemon added successfully')
}

async function checkIfPokemonsIsInUserCollection(pokemonId: number, userId: string) {
  const data = await repository.checkIfPokemonsIsAlreadyInCollectionWithIds(pokemonId, userId)
  appLog('Repository', 'Repository accessed successfully')
  if (data.length===0) {
    throw new AppError(
      'Pokemon does not exists in user collection',
      409,
      'Pokemon does not exists in user collection',
      'Remove a pokemon that exists in the collection'
    )
  }
  return appLog('Service', 'Pokemon registered in user collection')
}

async function removePokemon(id: number, subject: string){
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