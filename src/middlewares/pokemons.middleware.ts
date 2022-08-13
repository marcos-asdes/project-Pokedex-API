import { NextFunction, Request, Response } from 'express'

import { AppError } from "../events/AppError.js";
import appLog from "../events/appLog.js";

import * as repository from '../repositories/pokemons.repository.js'

async function checkIfPokemonExists (req: Request, res: Response, next: NextFunction) {
  let { id } = req.params
  const data =  await repository.findByIdNumber(Number(id))
  appLog('Repository', 'Repository accessed successfully')
  if (!data) {
    throw new AppError(
      'Pokemon does not exist in database',
      404,
      'Pokemon does not exist in database',
      'Enter a valid pokemon id'
    )
  }
  res.locals.data = data;
  appLog('Middleware', 'Pokemon exists in database')
  next()
}

export { checkIfPokemonExists }