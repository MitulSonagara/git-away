-- CreateTable
CREATE TABLE "public"."RepoFile" (
    "id" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "sha" TEXT NOT NULL,

    CONSTRAINT "RepoFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RepoFile_repoId_idx" ON "public"."RepoFile"("repoId");

-- CreateIndex
CREATE UNIQUE INDEX "RepoFile_repoId_path_key" ON "public"."RepoFile"("repoId", "path");

-- AddForeignKey
ALTER TABLE "public"."RepoFile" ADD CONSTRAINT "RepoFile_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "public"."Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
