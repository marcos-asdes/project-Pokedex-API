import client from '../config/database.js'
import appLog from '../events/appLog.js'

import { Pokemon, UsersPokemons } from '@prisma/client'

async function getAllPokemonsInDatabase(): Promise<Pokemon[]> {
  const pokemons = await client.pokemon.findMany()
  appLog('Repository', 'Repository accessed successfully')
  return pokemons
}

async function selectPokemonsInUserCollection(
  id: string
): Promise<UsersPokemons[]> {
  const pokemons = await client.usersPokemons.findMany({
    where: {
      userId: id
    }
  })
  appLog('Repository', 'Repository accessed successfully')
  return pokemons
}

async function findPokemonByIdNumber(id: number): Promise<Pokemon | null> {
  const pokemon = await client.pokemon.findUnique({ where: { id } })
  appLog('Repository', 'Repository accessed successfully')
  return pokemon
}

async function checkIfPokemonIsInCollection(
  pokemonId: number,
  userId: string
): Promise<UsersPokemons[]> {
  const select = await client.usersPokemons.findMany({
    where: {
      AND: [
        {
          userId: userId
        },
        {
          pokemonId: pokemonId
        }
      ]
    }
  })
  appLog('Repository', 'Repository accessed successfully')
  return select
}

async function addPokemonInUserCollection(
  pokemonId: number,
  userId: string
): Promise<void> {
  await client.usersPokemons.create({
    data: {
      userId: userId,
      pokemonId: pokemonId
    }
  })
  appLog('Repository', 'Repository accessed successfully')
}

async function removePokemonFromUserCollection(
  pokemonId: number,
  userId: string
): Promise<void> {
  await client.usersPokemons.deleteMany({
    where: {
      AND: [
        {
          userId: userId
        },
        {
          pokemonId: pokemonId
        }
      ]
    }
  })
  appLog('Repository', 'Repository accessed successfully')
}

export {
  getAllPokemonsInDatabase,
  selectPokemonsInUserCollection,
  findPokemonByIdNumber,
  checkIfPokemonIsInCollection,
  addPokemonInUserCollection,
  removePokemonFromUserCollection
}
