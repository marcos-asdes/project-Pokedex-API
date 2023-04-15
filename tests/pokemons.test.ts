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
function regexExtractJwtToken(str: string) {
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

  test('method get should return code 200 - success', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    const response = await supertest(app)
      .get(getPokemons)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
  })

  test('method get should return code 401 - invalid token', async () => {
    const response = await supertest(app)
      .get(getPokemons)
      .set('Authorization', `Bearer ${faker.datatype.uuid}`)

    expect(response.status).toEqual(401)
  })
})

describe('Test suite: method post - route /my-pokemons/:id/add', () => {
  const register = '/api/sign-up'
  const login = '/api/sign-in'

  test('method post should return code 200 - success', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    let addPokemon = '/api/my-pokemons/:id/add'

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    const randomInt = Math.floor(Math.random() * 250 + 1).toString()
    addPokemon = addPokemon.replace(':id', randomInt)

    const response = await supertest(app)
      .post(addPokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
  })

  test('method post should return code 401 - invalid token', async () => {
    let addPokemon = '/api/my-pokemons/:id/add'
    const randomInt = Math.floor(Math.random() * 250 + 1).toString()
    addPokemon = addPokemon.replace(':id', randomInt)

    const response = await supertest(app)
      .get(addPokemon)
      .set('Authorization', `Bearer ${faker.datatype.uuid}`)

    expect(response.status).toEqual(401)
  })

  test('method post should return code 404 - pokemon does not exist in database', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    let addPokemon = '/api/my-pokemons/:id/add'

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    addPokemon = addPokemon.replace(':id', '0')

    const response = await supertest(app)
      .post(addPokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(404)
  })

  test('method post should return code 409 - pokemon already exists in user collection', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    let addPokemon = '/api/my-pokemons/:id/add'

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    const randomInt = Math.floor(Math.random() * 250 + 1).toString()
    addPokemon = addPokemon.replace(':id', randomInt)

    await supertest(app)
      .post(addPokemon)
      .set('Authorization', `Bearer ${token}`)

    const response = await supertest(app)
      .post(addPokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(409)
  })
})

describe('Test suite: method post - route /my-pokemons/:id/remove', () => {
  const register = '/api/sign-up'
  const login = '/api/sign-in'

  test('method post should return code 200 - success', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    let addPokemon = '/api/my-pokemons/:id/add'
    let removePokemon = '/api/my-pokemons/:id/remove'

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    const randomInt = Math.floor(Math.random() * 250 + 1).toString()
    addPokemon = addPokemon.replace(':id', randomInt)
    removePokemon = removePokemon.replace(':id', randomInt)

    await supertest(app)
      .post(addPokemon)
      .set('Authorization', `Bearer ${token}`)

    const response = await supertest(app)
      .post(removePokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
  })

  test('method post should return code 401 - invalid token', async () => {
    let removePokemon = '/api/my-pokemons/:id/remove'
    const randomInt = Math.floor(Math.random() * 250 + 1).toString()
    removePokemon = removePokemon.replace(':id', randomInt)

    const response = await supertest(app)
      .get(removePokemon)
      .set('Authorization', `Bearer ${faker.datatype.uuid}`)

    expect(response.status).toEqual(401)
  })

  test('method post should return code 404 - pokemon does not exist in database', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    let removePokemon = '/api/my-pokemons/:id/remove'

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    removePokemon = removePokemon.replace(':id', '0')

    const response = await supertest(app)
      .post(removePokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(404)
  })

  test('method post should return code 409 - pokemon does not exists in user collection', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    let removePokemon = '/api/my-pokemons/:id/remove'

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    const randomInt = Math.floor(Math.random() * 250 + 1).toString()
    removePokemon = removePokemon.replace(':id', randomInt)

    const response = await supertest(app)
      .post(removePokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(409)
  })

  test('method post should return code 409 - pokemon already removed from user collection', async () => {
    const bodyLogin = { email: EMAIL, password: PASSWORD }
    const bodyRegister = { ...bodyLogin, confirmPassword: PASSWORD }
    let addPokemon = '/api/my-pokemons/:id/add'
    let removePokemon = '/api/my-pokemons/:id/remove'

    await supertest(app).post(register).send(bodyRegister)
    const responseLogin = await supertest(app).post(login).send(bodyLogin)
    const token: string = regexExtractJwtToken(responseLogin.text)

    const randomInt = Math.floor(Math.random() * 250 + 1).toString()
    addPokemon = addPokemon.replace(':id', randomInt)
    removePokemon = removePokemon.replace(':id', randomInt)

    await supertest(app)
      .post(addPokemon)
      .set('Authorization', `Bearer ${token}`)

    await supertest(app)
      .post(removePokemon)
      .set('Authorization', `Bearer ${token}`)

    const response = await supertest(app)
      .post(removePokemon)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(409)
  })
})
