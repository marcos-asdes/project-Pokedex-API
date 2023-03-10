import { Pokemon, User } from "@prisma/client";

export type CreateUser = Pick<User, "email" | "password">

export type DataWithBoolean = Pokemon & { inMyPokemons: boolean }

export type DataWithoutBoolean = Omit<DataWithBoolean, "inMyPokemons">
