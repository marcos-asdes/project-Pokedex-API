import client from '../config/database.js'

async function getAllPokemons () {
  return await client.pokemon.findMany()
}

async function findByIdNumber (id: number) {
  return client.pokemon.findUnique({where: { id }})
}

async function addPokemonInUserCollection(data: any) {
  
}

export { getAllPokemons, findByIdNumber, addPokemonInUserCollection }