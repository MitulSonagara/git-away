/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommitLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmergencyCommit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RepoSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduledJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommitLog" DROP CONSTRAINT "CommitLog_repoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommitLog" DROP CONSTRAINT "CommitLog_scheduledJobId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommitLog" DROP CONSTRAINT "CommitLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmergencyCommit" DROP CONSTRAINT "EmergencyCommit_repoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmergencyCommit" DROP CONSTRAINT "EmergencyCommit_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RepoSetting" DROP CONSTRAINT "RepoSetting_repoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduledJob" DROP CONSTRAINT "ScheduledJob_repoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduledJob" DROP CONSTRAINT "ScheduledJob_userId_fkey";

-- DropTable
DROP TABLE "public"."AuditLog";

-- DropTable
DROP TABLE "public"."CommitLog";

-- DropTable
DROP TABLE "public"."EmergencyCommit";

-- DropTable
DROP TABLE "public"."RepoSetting";

-- DropTable
DROP TABLE "public"."ScheduledJob";
