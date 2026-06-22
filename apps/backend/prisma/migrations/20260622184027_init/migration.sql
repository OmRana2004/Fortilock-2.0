/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Dealer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aadharNumber]` on the table `Dealer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[panNumber]` on the table `Dealer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPerson` to the `Dealer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_dealerId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dealer" DROP CONSTRAINT "Dealer_userId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "alternatePhone" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "ifscCode" TEXT;

-- AlterTable
ALTER TABLE "Dealer" ADD COLUMN     "aadharCard" TEXT,
ADD COLUMN     "aadharNumber" TEXT,
ADD COLUMN     "contactPerson" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "gstCertificate" TEXT,
ADD COLUMN     "gstNumber" TEXT,
ADD COLUMN     "panCard" TEXT,
ADD COLUMN     "panNumber" TEXT,
ADD COLUMN     "yearOfEstablishment" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_phone_key" ON "Dealer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_aadharNumber_key" ON "Dealer"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_panNumber_key" ON "Dealer"("panNumber");

-- AddForeignKey
ALTER TABLE "Dealer" ADD CONSTRAINT "Dealer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
