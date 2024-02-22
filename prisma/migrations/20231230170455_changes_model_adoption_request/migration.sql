/*
  Warnings:

  - You are about to drop the column `homeOffice` on the `adoptionRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adoptionRequest" DROP COLUMN "homeOffice",
ALTER COLUMN "requestApproved" DROP NOT NULL;
