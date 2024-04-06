-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "charge" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "independence" TEXT NOT NULL,
    "ambience" TEXT NOT NULL,
    "orgs_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "pets_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" SERIAL NOT NULL,
    "requirement" TEXT NOT NULL,
    "pets_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_cep_key" ON "orgs"("email", "cep");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgs_id_fkey" FOREIGN KEY ("orgs_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pets_id_fkey" FOREIGN KEY ("pets_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_pets_id_fkey" FOREIGN KEY ("pets_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
