import axios from 'axios'

import client from '../src/config/database.js'
import appLog from '../src/events/appLog.js'

async function popPokedex() {
  const pokelist = 20
  for(let i=1; i<=pokelist; i++) {
    const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${i}/`
    axios.get(pokeAPI)
    .then(async(res) =>{
      const data = res.data
      await client.pokemon.create({
        data: {
          id: data.id,
          name: data.name,
          number: data.order,
          image: data.sprites.front_default,
          weight: data.weight,
          height: data.height,
          baseExp: data.base_experience,
          description: "no description available"
        }
      })
    })
    .catch(error => appLog('Error', `${error}`))
  }
}

popPokedex()
