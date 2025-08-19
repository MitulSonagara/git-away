/*
  Warnings:

  - You are about to drop the column `id_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `config` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `integrationId` on the `Repo` table. All the data in the column will be lost.
  - You are about to drop the column `cronExpression` on the `ScheduledJob` table. All the data in the column will be lost.
  - You are about to drop the `GitHubIntegration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[repoId]` on the table `RepoSetting` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."GitHubIntegration" DROP CONSTRAINT "GitHubIntegration_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Repo" DROP CONSTRAINT "Repo_integrationId_fkey";

-- DropIndex
DROP INDEX "public"."Repo_integrationId_idx";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "id_token",
DROP COLUMN "session_state";

-- AlterTable
ALTER TABLE "public"."Repo" DROP COLUMN "config",
DROP COLUMN "integrationId";

-- AlterTable
ALTER TABLE "public"."RepoSetting" ALTER COLUMN "timezone" SET DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "public"."ScheduledJob" DROP COLUMN "cronExpression";

-- DropTable
DROP TABLE "public"."GitHubIntegration";

-- DropTable
DROP TABLE "public"."VerificationToken";

-- CreateIndex
CREATE INDEX "EmergencyCommit_userId_idx" ON "public"."EmergencyCommit"("userId");

-- CreateIndex
CREATE INDEX "EmergencyCommit_repoId_idx" ON "public"."EmergencyCommit"("repoId");

-- CreateIndex
CREATE UNIQUE INDEX "RepoSetting_repoId_key" ON "public"."RepoSetting"("repoId");
