-- CreateEnum
CREATE TYPE "Idade" AS ENUM ('FILHOTE', 'JOVEM', 'ADULTO', 'IDOSO');

-- CreateEnum
CREATE TYPE "Porte" AS ENUM ('PEQUENINO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "Energia" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "Dependencia" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "Ambiente" AS ENUM ('AMPLO', 'MEDIO', 'PEQUENO');

-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('GATO', 'CACHORRO');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "idade" "Idade" NOT NULL,
    "porte" "Porte" NOT NULL,
    "energia" "Energia" NOT NULL,
    "dependencia" "Dependencia" NOT NULL,
    "ambiente" "Ambiente" NOT NULL,
    "especie" "Especie" NOT NULL,
    "cidade" TEXT NOT NULL,
    "requesitos" TEXT,
    "org_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos_pets" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "imagem" TEXT,

    CONSTRAINT "fotos_pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_nome_key" ON "orgs"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_cep_key" ON "orgs"("cep");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos_pets" ADD CONSTRAINT "fotos_pets_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
