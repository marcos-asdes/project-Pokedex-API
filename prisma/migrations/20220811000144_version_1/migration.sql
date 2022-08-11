-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "baseExp" INTEGER NOT NULL,
    "description" TEXT,
    "inMyPokemons" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "users_pokemons" (
    "id" SERIAL NOT NULL,
    "idUser" TEXT NOT NULL,
    "idPokemon" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_id_key" ON "pokemons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_name_key" ON "pokemons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_pokemons_id_key" ON "users_pokemons"("id");

-- AddForeignKey
ALTER TABLE "users_pokemons" ADD CONSTRAINT "users_pokemons_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_pokemons" ADD CONSTRAINT "users_pokemons_idPokemon_fkey" FOREIGN KEY ("idPokemon") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
