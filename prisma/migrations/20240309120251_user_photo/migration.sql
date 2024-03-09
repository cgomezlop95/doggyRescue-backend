/*
  Warnings:

  - You are about to drop the column `dogPhotoURL` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dogPhotoURL",
ADD COLUMN     "userPhotoURL" TEXT;
