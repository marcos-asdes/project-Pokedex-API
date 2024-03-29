import supertest from 'supertest'
import { faker } from '@faker-js/faker'

import app from '../src/app.js'
import client from '../src/config/database.js'

afterAll(async () => {
  await client.$disconnect()
})

// Environment variables
const EMAIL = faker.internet.email()
const PASSWORD = faker.internet.password()

// Integration tests
describe('Test suite: method post - route /sign-up', () => {
  const register = '/api/sign-up'

  test('method post should return code 201 - success', async () => {
    const body = { email: EMAIL, password: PASSWORD, confirmPassword: PASSWORD }

    const response = await supertest(app).post(register).send(body)

    expect(response.status).toEqual(201)
  })

  test('method post should return code 400 - invalid inputs', async () => {
    const body = {
      email: PASSWORD,
      password: EMAIL,
      confirmPassword: PASSWORD
    }

    const response = await supertest(app).post(register).send(body)

    expect(response.status).toEqual(400)
  })

  test('method post should return code 409 - email already registered', async () => {
    const body = { email: EMAIL, password: PASSWORD, confirmPassword: PASSWORD }

    await supertest(app).post(register).send(body)
    const response = await supertest(app).post(register).send(body)

    expect(response.status).toEqual(409)
  })
})

describe('Test suite: method post - route /sign-in', () => {
  const register = '/api/sign-up'
  const login = '/api/sign-in'

  test('method post should return code 200 - success', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    await supertest(app).post(register).send(bodyRegister)

    const response = await supertest(app).post(login).send(bodyLogin)

    expect(response.status).toEqual(200)
  })

  test('method post should return code 400 - invalid inputs', async () => {
    const bodyLogin = { email: PASSWORD, password: EMAIL }
    const bodyRegister = {
      email: EMAIL,
      password: PASSWORD,
      confirmPassword: PASSWORD
    }
    await supertest(app).post(register).send(bodyRegister)

    const response = await supertest(app).post(login).send(bodyLogin)

    expect(response.status).toEqual(400)
  })

  test('method post should return code 401 - email not found', async () => {
    const bodyLogin = { email: 'test@email.com', password: PASSWORD }

    const response = await supertest(app).post(login).send(bodyLogin)

    expect(response.status).toEqual(401)
  })

  test('method post should return code 401 - invalid password', async () => {
    const bodyLogin = { email: EMAIL, password: '12345678' }

    const response = await supertest(app).post(login).send(bodyLogin)

    expect(response.status).toEqual(401)
  })
})
