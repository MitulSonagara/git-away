/*
  Warnings:

  - You are about to drop the column `repoFullName` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `repoIdExternal` on the `Repo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,externalRepoId]` on the table `Repo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalRepoId` to the `Repo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoName` to the `Repo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoUrl` to the `Repo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Repo_repoFullName_userId_key";

-- AlterTable
ALTER TABLE "public"."Repo" DROP COLUMN "repoFullName",
DROP COLUMN "repoIdExternal",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "externalRepoId" TEXT NOT NULL,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "languageColor" TEXT,
ADD COLUMN     "repoName" TEXT NOT NULL,
ADD COLUMN     "repoUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Repo_userId_externalRepoId_key" ON "public"."Repo"("userId", "externalRepoId");
