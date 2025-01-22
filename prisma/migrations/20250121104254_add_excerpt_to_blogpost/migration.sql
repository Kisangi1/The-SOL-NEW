-- CreateEnum
CREATE TYPE "TourType" AS ENUM ('DAYS', 'NIGHTS');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "category" TEXT,
ADD COLUMN     "excerpt" TEXT;

-- CreateTable
CREATE TABLE "PackageBooking" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "bookingDate" TIMESTAMP(3),
    "numberOfGuests" INTEGER NOT NULL DEFAULT 1,
    "specialRequests" TEXT,
    "packageId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "imageData" TEXT,
    "duration" TEXT NOT NULL,
    "groupSize" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Included" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Included_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeepAlive" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT DEFAULT '',
    "random" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "KeepAlive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "tags" TEXT[],
    "imageData" TEXT,
    "description" TEXT NOT NULL,
    "daysNights" INTEGER NOT NULL,
    "tourType" "TourType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PackageBooking" ADD CONSTRAINT "PackageBooking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Included" ADD CONSTRAINT "Included_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
