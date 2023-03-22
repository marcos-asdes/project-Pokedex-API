import client from '../config/database.js'
import { CreateUser } from '../types/types.js'

async function findByEmail (email: string) {
  return await client.user.findUnique({ where: { email } })
}

async function findByIdString (id: string) {
  return await client.user.findUnique({where: { id }})
}

async function registerUser (data: CreateUser) {
  return await client.user.create({ data })
}

export { 
  findByEmail, 
  findByIdString, 
  registerUser 
}