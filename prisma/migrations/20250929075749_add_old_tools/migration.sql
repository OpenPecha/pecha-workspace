-- CreateTable
CREATE TABLE "public"."oldTools" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "demo" TEXT,
    "icon" TEXT,
    "department" TEXT[],
    "active" BOOLEAN,

    CONSTRAINT "oldTools_pkey" PRIMARY KEY ("id")
);
