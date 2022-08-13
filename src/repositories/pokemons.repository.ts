import client from '../config/database.js'

async function getAllPokemonsInDatabase () {
  return await client.pokemon.findMany()
}

async function findByIdNumber (id: number) {
  return await client.pokemon.findUnique({where: { id }})
}

async function checkIfPokemonsIsAlreadyInCollectionWithIds (pokemonId: number, userId: string) {
  return await client.usersPokemons.findMany({
    where: {
      AND: [
        {
          idUser: userId
        },
        {
          idPokemon: pokemonId
        }
      ]
    }
  })
}

async function addPokemonInUserCollection (pokemonId: number, userId: string) {
  return await client.usersPokemons.create({
    data: {
      idUser: userId,
      idPokemon: pokemonId
    }
  })
}

export { 
  getAllPokemonsInDatabase, 
  findByIdNumber, 
  checkIfPokemonsIsAlreadyInCollectionWithIds,
  addPokemonInUserCollection 
}