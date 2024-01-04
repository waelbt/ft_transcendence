/*
  Warnings:

  - Added the required column `exp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "exp" INTEGER NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL;
