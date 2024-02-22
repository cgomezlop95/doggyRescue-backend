/*
  Warnings:

  - The primary key for the `adoptionRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `adoptionRequest` table. All the data in the column will be lost.
  - You are about to drop the column `montlyMoney` on the `adoptionRequest` table. All the data in the column will be lost.
  - Added the required column `dogId` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyMoney` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `adoptionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoptionRequest" DROP CONSTRAINT "adoptionRequest_pkey",
DROP COLUMN "id",
DROP COLUMN "montlyMoney",
ADD COLUMN     "dogId" TEXT NOT NULL,
ADD COLUMN     "monthlyMoney" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "adoptionRequest_pkey" PRIMARY KEY ("userId", "dogId");

-- AddForeignKey
ALTER TABLE "adoptionRequest" ADD CONSTRAINT "adoptionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptionRequest" ADD CONSTRAINT "adoptionRequest_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
