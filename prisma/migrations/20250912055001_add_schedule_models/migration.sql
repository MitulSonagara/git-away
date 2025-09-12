-- CreateTable
CREATE TABLE "public"."Schedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScheduleRepo" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduleRepo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ScheduleRepo_scheduleId_idx" ON "public"."ScheduleRepo"("scheduleId");

-- CreateIndex
CREATE INDEX "ScheduleRepo_repoId_idx" ON "public"."ScheduleRepo"("repoId");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleRepo_scheduleId_repoId_key" ON "public"."ScheduleRepo"("scheduleId", "repoId");

-- AddForeignKey
ALTER TABLE "public"."Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleRepo" ADD CONSTRAINT "ScheduleRepo_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleRepo" ADD CONSTRAINT "ScheduleRepo_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "public"."Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
