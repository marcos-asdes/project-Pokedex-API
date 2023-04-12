import { Pokemon } from '@prisma/client'

export type PokemonDataWithBoolean = Pokemon & { inMyPokemons: boolean }
