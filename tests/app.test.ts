import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { jest } from '@jest/globals'

import app from '../src/app'
//import client from '../src/config/database'

import * as authRepository from '../src/repositories/authRepository'
import * as authService from '../src/services/authService'
import client from '../src/config/database.js'
/* afterAll(async () => {
  await client.$disconnect()
}) */
beforeAll(async () => {
  client.$disconnect
})
afterEach(() => jest.clearAllMocks())
// Environment variables
const EMAIL = faker.internet.email()
const PASSWORD = faker.internet.password()

jest.mock('../src/repositories/authRepository.ts')

// Integration tests
describe('Test suite: method post - route /sign-up', () => {
  const route = '/api/sign-up'

  // verificar se um metodo post é executado retornando status 201
  test('generic text 1', () => {
    //const body = { email: EMAIL, password: PASSWORD }
    jest.spyOn(authRepository, 'findByEmail').mockImplementation((): any => {})
    //jest.spyOn(authRepository, 'registerUser').mockImplementation(():any => null)
    //const response = await supertest(app).post(route).send(body)
    //authService.findUserByEmail_expectDataIsNull(body.email)

    expect(authRepository.findByEmail).toHaveBeenCalled()
  })

  // verificar se a validação dos elementos do json está funcionando...
  // para o caso de email ou senha invalidos, retornar 400
  // verificar se o email no json já está registrado no db, retornar 400 caso esteja
  /* describe('Test suite: method post - route /sign-in', () => {
  // verificar se o metodo post é executado retornando status 200 e uma mensagem padrão de token
  // verificar se a validação dos elementos do json está funcionando...
  // para o caso de email ou senha invalidos, retornar 400
  // verificar se o usuario e senha são corretos, não sendo retornar 401
  // ? verificar se token é gerado corresponde ao id do usuario, se não retornar 404
})

describe('Test suite: method get - route /pokemons', () => {
  // verificar se o token de usuário é válido, se não for retornar 401
  // se o get retornar o json, o status deve ser 200
})

describe('Test suite: method post - route /my-pokemons/:id/add', () => {
  // verificar se o token de usuário é válido, se não for retornar 401
  // verificar se o id do pokemon existe, se não retornar 404
  // verificar se o pokemon já está na coleção, se não retornar 409
  // se o post for bem sucedido, o status deve ser 200
})

describe('Test suite: method post - route /my-pokemons/:id/remove', () => {
  // verificar se o token de usuário é válido, se não for retornar 401
  // verificar se o id do pokemon existe, se não retornar 404
  // verificar se o pokemon não está na coleção, se sim retornar 409
  // se o post for bem sucedido, o status deve ser 200
}) */
})
