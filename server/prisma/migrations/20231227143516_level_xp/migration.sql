-- AlterTable
ALTER TABLE "User" ALTER COLUMN "exp" DROP NOT NULL,
ALTER COLUMN "exp" SET DEFAULT 0,
ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "level" SET DEFAULT 0;
