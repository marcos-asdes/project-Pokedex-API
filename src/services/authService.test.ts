import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

import * as authService from './authService.js'
import { error } from 'console'

const PASSWORD = faker.internet.password()

describe('unit test suite 1', () => {
  it('should return ...', () => {
    const encrypted = authService.hashPassword(PASSWORD)
    const verify = bcrypt.compareSync(PASSWORD, encrypted)
    expect(verify).toEqual(true)
  })

  /* it('should return ...', () => {
    process.env.SALT = 'string'
    const encrypted = authService.hashPassword(PASSWORD)
    const verify = bcrypt.compareSync(PASSWORD, encrypted)
    expect(verify).toEqual(false)
    expect(error).toEqual(false)
  }) */
})
