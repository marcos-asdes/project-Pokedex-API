import client from '../config/database.js'

async function findByEmail (email: string) {
  return await client.user.findUnique({ where: { email } })
}

async function registerUser (data: any) {
  return await client.user.create({ data })
}

export { findByEmail, registerUser }