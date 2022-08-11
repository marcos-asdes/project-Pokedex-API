import bcrypt from 'bcrypt'
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken'

import * as repository from '../repositories/auth.repository.js'

import appLog from '../events/appLog.js'
import { AppError } from '../events/appError.js'

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

function generateToken (id: string) {
  const data = {}
  const subject = id
  const secretKey = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN

  const algorithm = process.env.JWT_ALGORITHM as Algorithm
  const config: SignOptions = { algorithm, expiresIn, subject }

  const token = jwt.sign(data, secretKey, config)

  appLog('Service', 'Token generated')
  return token
}

async function findUserById(id: string) {
  const user = await repository.findById(id);
  if (!user) {
    throw new AppError(
      'User not found',
      404,
      'User not found',
      'Critical Failure: The provided userId is not related to any user',
    );
  };

  return user;
}

export { hashPassword, decryptPassword, generateToken, findUserById }
