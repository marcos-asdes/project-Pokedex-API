import { NextFunction, Request, Response } from 'express'

import appLog from '../events/appLog.js';

import * as service from '../services/pokemons.service.js'

async function checkIfPokemonExists (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  const pokemonId = Number(id)

  const pokemon_data = await service.findPokemonByIdNumber(pokemonId)

  res.locals.pokemon_data = pokemon_data;
  appLog('Middleware', 'Pokemon exists in database')
  next()
}

async function checkIfPokemonsIsAlreadyInCollection (_req: Request, res: Response, next: NextFunction) {
  const id: number = res.locals.pokemon_data.id
  const subject: string = res.locals.subject // user id

  await service.checkIfPokemonsIsAlreadyInUserCollection(id, subject)

  appLog('Middleware', 'Pokemon does not exist in user collection')
  next()
}

async function checkIfPokemonsIsInCollection(_req: Request, res: Response, next: NextFunction) {
  const id: number = res.locals.pokemon_data.id
  const subject: string = res.locals.subject // user id

  await service.checkIfPokemonsIsInUserCollection(id, subject)

  appLog('Middleware', 'Pokemon exists in user collection')
  next()
}

export { 
  checkIfPokemonExists, 
  checkIfPokemonsIsAlreadyInCollection,
  checkIfPokemonsIsInCollection
}