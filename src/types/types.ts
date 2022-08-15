export type CreateUser = {
  email: string;
  password: string;
}

export type User = {
  id: string;
  email: string;
  password: string;
  created_at: Date;
}

export type DataWithBoolean = {
  id: number;
  name: string;
  number: number;
  image: string;
  weight: number;
  height: number;
  baseExp: number;
  description: string;
  inMyPokemons: boolean;
}

export type DataWithoutBoolean = Omit<DataWithBoolean, "inMyPokemons">
