import bcrypt from 'bcrypt'
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken'

import appLog from '../events/appLog.js'

function hashPassword (password: string) {
  const encrypted = bcrypt.hashSync(password, +process.env.SALT)

  appLog('Service', 'Password encrypted')
  return encrypted
}

function decryptPassword (password: string, encrypted: string) {
  const passwordIsValid = bcrypt.compareSync(password, encrypted)

  appLog('Service', 'Password decrypted')
  return passwordIsValid
}

function generateToken (id: number) {
  const data = {}
  const subject = id.toString()
  const secretKey = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN

  const algorithm = process.env.JWT_ALGORITHM as Algorithm
  const config: SignOptions = { algorithm, expiresIn, subject }

  const token = jwt.sign(data, secretKey, config)

  appLog('Service', 'Token generated')
  return token
}

export { hashPassword, decryptPassword, generateToken }
