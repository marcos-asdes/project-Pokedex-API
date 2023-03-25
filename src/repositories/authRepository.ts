import { User } from '@prisma/client'
import client from '../config/database.js'
import { CreateUser } from '../types/types.js'

async function findByEmail (email: string): Promise<User | null> {
  console.log('deu ruim')
  return await client.user.findUnique({ where: { email } })
}

async function findByIdString (id: string) {
  return await client.user.findUnique({where: { id }})
}

async function registerUser (data: CreateUser):Promise<CreateUser | null> {
  return await client.user.create({ data })
}

export { 
  findByEmail, 
  findByIdString, 
  registerUser 
}