import client from '../config/database.js'

async function getAllPokemonsInDatabase() {
  return await client.pokemon.findMany()
}

async function selectPokemonsInUserCollection(id: string) {
  return await client.usersPokemons.findMany({
    where: {
      userId: id
    }
  })
}

async function findByIdNumber(id: number) {
  return await client.pokemon.findUnique({ where: { id } })
}

async function checkIfPokemonsIsAlreadyInCollectionWithIds(
  pokemonId: number,
  userId: string
) {
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
  return select
}

async function addPokemonInUserCollection(pokemonId: number, userId: string) {
  return await client.usersPokemons.create({
    data: {
      userId: userId,
      pokemonId: pokemonId
    }
  })
}

async function removePokemonFromUserCollection(
  pokemonId: number,
  userId: string
) {
  const select = await checkIfPokemonsIsAlreadyInCollectionWithIds(
    pokemonId,
    userId
  )
  return await client.usersPokemons.delete({
    where: {
      id: select[0].id
    }
  })
}

export {
  getAllPokemonsInDatabase,
  selectPokemonsInUserCollection,
  findByIdNumber,
  checkIfPokemonsIsAlreadyInCollectionWithIds,
  addPokemonInUserCollection,
  removePokemonFromUserCollection
}
