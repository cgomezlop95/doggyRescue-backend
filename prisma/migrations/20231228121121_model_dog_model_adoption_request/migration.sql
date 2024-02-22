-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dogPhotoURL" TEXT NOT NULL,
    "dogName" TEXT NOT NULL,
    "dogAge" INTEGER NOT NULL,
    "dogWeight" INTEGER NOT NULL,
    "dogSex" TEXT NOT NULL,
    "dogBreed" TEXT NOT NULL,
    "dogAdopted" BOOLEAN NOT NULL,
    "suitableForKids" BOOLEAN,
    "suitableForOtherPets" BOOLEAN,
    "description" TEXT,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoptionRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN NOT NULL,

    CONSTRAINT "adoptionRequest_pkey" PRIMARY KEY ("id")
);
