/*
  Warnings:

  - You are about to drop the column `inMyPokemons` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `idPokemon` on the `users_pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `users_pokemons` table. All the data in the column will be lost.
  - Added the required column `pokemonId` to the `users_pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `users_pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_pokemons" DROP CONSTRAINT "users_pokemons_idPokemon_fkey";

-- DropForeignKey
ALTER TABLE "users_pokemons" DROP CONSTRAINT "users_pokemons_idUser_fkey";

-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons";

-- AlterTable
ALTER TABLE "users_pokemons" DROP COLUMN "idPokemon",
DROP COLUMN "idUser",
ADD COLUMN     "pokemonId" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_pokemons" ADD CONSTRAINT "users_pokemons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_pokemons" ADD CONSTRAINT "users_pokemons_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
