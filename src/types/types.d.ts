import { Pokemon, User } from '@prisma/client'

export type PokemonDataWithBoolean = Pokemon & { inMyPokemons: boolean }
