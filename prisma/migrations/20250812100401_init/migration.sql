-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "picture" TEXT,
    "name" TEXT,
    "role" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "category" TEXT,
    "price" DOUBLE PRECISION,
    "link" TEXT,
    "demo" TEXT,
    "icon" TEXT,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);
