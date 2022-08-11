import client from '../config/database.js'

async function getPoke () {
  return await client.pokemon.findMany()
}

export { getPoke }