import { User } from '@prisma/client'
import client from '../config/database.js'
import appLog from '../events/appLog.js'

async function findUserByEmail(email: string): Promise<User | null> {
  const user = await client.user.findUnique({ where: { email } })
  appLog('Repository', 'Repository accessed successfully')
  return user
}

async function findUserByIdString(id: string): Promise<User | null> {
  const user = await client.user.findUnique({ where: { id } })
  appLog('Repository', 'Repository accessed successfully')
  return user
}

async function registerUser(email: string, password: string): Promise<void> {
  const data = { email: email, password: password }
  await client.user.create({ data })
  appLog('Repository', 'Repository accessed successfully')
}

export { findUserByEmail, findUserByIdString, registerUser }
