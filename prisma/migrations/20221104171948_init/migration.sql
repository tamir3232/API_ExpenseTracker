-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracker" (
    "id" SERIAL NOT NULL,
    "money" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "tracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spend" (
    "id" SERIAL NOT NULL,
    "spendingMoney" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trackerId" INTEGER,

    CONSTRAINT "Spend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "income" (
    "id" SERIAL NOT NULL,
    "incomeMoney" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trackerId" INTEGER,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tracker_id_key" ON "tracker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Spend_id_key" ON "Spend"("id");

-- CreateIndex
CREATE UNIQUE INDEX "income_id_key" ON "income"("id");

-- AddForeignKey
ALTER TABLE "tracker" ADD CONSTRAINT "tracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spend" ADD CONSTRAINT "Spend_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "tracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "tracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
