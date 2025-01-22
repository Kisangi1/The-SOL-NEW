/*
  Warnings:

  - Changed the type of `groupSize` on the `Package` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `bookingDate` on table `PackageBooking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Included" DROP CONSTRAINT "Included_packageId_fkey";

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "availability" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
ADD COLUMN     "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "groupSize",
ADD COLUMN     "groupSize" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PackageBooking" ALTER COLUMN "bookingDate" SET NOT NULL;

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Included" ADD CONSTRAINT "Included_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
