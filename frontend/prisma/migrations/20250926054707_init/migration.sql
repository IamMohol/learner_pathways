-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Learner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pathway" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "PathwaySubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pathwayId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "weight" REAL NOT NULL DEFAULT 1.0,
    CONSTRAINT "PathwaySubject_pathwayId_fkey" FOREIGN KEY ("pathwayId") REFERENCES "Pathway" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PathwaySubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "learnerId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    CONSTRAINT "Mark_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mark_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Pathway_name_key" ON "Pathway"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PathwaySubject_pathwayId_subjectId_key" ON "PathwaySubject"("pathwayId", "subjectId");

-- CreateIndex
CREATE INDEX "Mark_learnerId_idx" ON "Mark"("learnerId");

-- CreateIndex
CREATE INDEX "Mark_subjectId_idx" ON "Mark"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "one_mark_per_learner_subject_exam" ON "Mark"("learnerId", "subjectId");
