import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as repository from '../repositories/pokemons.repository.js'

async function getPokemons (_req: Request, res: Response) {
  const getAllPokemons = await repository.getAllPokemons()
  appLog('Repository', 'Database response successful')

  appLog('Controller', 'Successfully obtained pokemons')
  return res.status(200).send(getAllPokemons)
}

async function postPokemonInUserCollection (_req: Request, res: Response) {
  const data = res.locals.data

  await repository.addPokemonInUserCollection(data)
  appLog('Repository', 'Pokemon added successfully')

  appLog('Controller', 'Completed post')
  return res.sendStatus(200)
}

export { postPokemonInUserCollection }

export { getPokemons }
