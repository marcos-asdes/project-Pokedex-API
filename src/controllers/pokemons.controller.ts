import { Request, Response } from 'express'

import appLog from '../events/appLog.js'

import * as repository from '../repositories/pokemons.repository.js'

async function getPokemons (_req: Request, res: Response) {
  const getPoke = await repository.getPoke()
  appLog('Repository', 'Database response successful')

  appLog('Controller', 'Successfully obtained pokemons')
  return res.status(200).send(getPoke)
}

export { getPokemons }
