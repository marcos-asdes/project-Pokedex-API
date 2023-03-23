import { Pokemon, User } from '@prisma/client'

export type CreateUser = Pick<User, 'email' | 'password'>

export type PokemonDataWithBoolean = Pokemon & { inMyPokemons: boolean }
