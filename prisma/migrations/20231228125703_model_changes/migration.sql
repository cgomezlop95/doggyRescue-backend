/*
  Warnings:

  - You are about to drop the column `description` on the `Dog` table. All the data in the column will be lost.
  - You are about to drop the column `approved` on the `adoptionRequest` table. All the data in the column will be lost.
  - Added the required column `adopterAge` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adopterDescription` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyHoursAway` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasExperience` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasGarden` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasKids` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasOtherPets` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeOffice` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montlyMoney` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfPeople` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfTrips` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestApproved` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dog" DROP COLUMN "description",
ADD COLUMN     "dogDescription" TEXT;

-- AlterTable
ALTER TABLE "adoptionRequest" DROP COLUMN "approved",
ADD COLUMN     "adopterAge" INTEGER NOT NULL,
ADD COLUMN     "adopterDescription" TEXT NOT NULL,
ADD COLUMN     "dailyHoursAway" INTEGER NOT NULL,
ADD COLUMN     "hasExperience" BOOLEAN NOT NULL,
ADD COLUMN     "hasGarden" BOOLEAN NOT NULL,
ADD COLUMN     "hasKids" BOOLEAN NOT NULL,
ADD COLUMN     "hasOtherPets" BOOLEAN NOT NULL,
ADD COLUMN     "homeOffice" BOOLEAN NOT NULL,
ADD COLUMN     "montlyMoney" INTEGER NOT NULL,
ADD COLUMN     "numberOfPeople" INTEGER NOT NULL,
ADD COLUMN     "numberOfTrips" INTEGER NOT NULL,
ADD COLUMN     "requestApproved" BOOLEAN NOT NULL;
