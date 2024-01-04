-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "welcome" BOOLEAN NOT NULL DEFAULT false,
    "harban" BOOLEAN NOT NULL DEFAULT false,
    "khari" BOOLEAN NOT NULL DEFAULT false,
    "brown" BOOLEAN NOT NULL DEFAULT false,
    "silver" BOOLEAN NOT NULL DEFAULT false,
    "goldon" BOOLEAN NOT NULL DEFAULT false,
    "hacker" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_id_key" ON "Achievement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_UserId_key" ON "Achievement"("UserId");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
