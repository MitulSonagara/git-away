/*
  Warnings:

  - You are about to drop the column `description` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `languageColor` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `lastCommitAt` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `repoName` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `repoUrl` on the `Repo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Repo" DROP COLUMN "description",
DROP COLUMN "isPrivate",
DROP COLUMN "language",
DROP COLUMN "languageColor",
DROP COLUMN "lastCommitAt",
DROP COLUMN "repoName",
DROP COLUMN "repoUrl";
