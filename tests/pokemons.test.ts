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

// Factory
function regexMatch(str: string) {
  const regex: RegExp = /\b[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g
  const match = str.match(regex)
  if (match) {
    return match[0]
  } else {
    return ''
  }
}

// Integration tests
describe('Test suite: method get - route /pokemons', () => {
  const register = '/api/sign-up'
  const login = '/api/sign-in'
  const getPokemons = '/api/pokemons'

  test('method get should return code 200', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexMatch(responseLogin.text)

    const response = await supertest(app)
      .get(getPokemons)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
  })

  test('method get should return code 401', async () => {
    const response = await supertest(app)
      .get(getPokemons)
      .set('Authorization', `Bearer ${faker.datatype.uuid}`)

    expect(response.status).toEqual(401)
  })
})

describe('Test suite: method post - route /my-pokemons/:id/add', () => {
  const register = '/api/sign-up'
  const login = '/api/sign-in'
  const randomInt = Math.floor(Math.random() * 250 + 1)
  const addPokemon = `/api/my-pokemons/${randomInt}/add`

  test('method get should return code 200', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexMatch(responseLogin.text)

    const response = await supertest(app)
      .post(addPokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
  })
})

/* describe('Test suite: method get - route /pokemons', () => {
  // verificar se o token de usuário é válido, se não for retornar 401
  // se o get retornar o json, o status deve ser 200
}) */
/* 
describe('Test suite: method post - route /my-pokemons/:id/add', () => {
  // verificar se o token de usuário é válido, se não for retornar 401
  // verificar se o id do pokemon existe, se não retornar 404
  // verificar se o pokemon já está na coleção, se não retornar 409
  // se o post for bem sucedido, o status deve ser 200
}) */

/*describe('Test suite: method post - route /my-pokemons/:id/remove', () => {
  // verificar se o token de usuário é válido, se não for retornar 401
  // verificar se o id do pokemon existe, se não retornar 404
  // verificar se o pokemon não está na coleção, se sim retornar 409
  // se o post for bem sucedido, o status deve ser 200
}) */
