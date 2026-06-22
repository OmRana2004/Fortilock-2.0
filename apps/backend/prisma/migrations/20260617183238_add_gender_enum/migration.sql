/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "photo",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dealerName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "yearOfEstablishment" INTEGER NOT NULL,
    "shopAddress" TEXT NOT NULL,
    "aadharCard" TEXT,
    "aadharCardNumber" TEXT NOT NULL,
    "panCard" TEXT,
    "panCardNumber" TEXT NOT NULL,
    "gstCertificate" TEXT,
    "gstCertificateNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dealerId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "alternateMobileNumber" TEXT,
    "email" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "customerPhoto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_userId_key" ON "Dealer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_mobileNumber_key" ON "Dealer"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_aadharCardNumber_key" ON "Dealer"("aadharCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_panCardNumber_key" ON "Dealer"("panCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_mobileNumber_key" ON "Customer"("mobileNumber");

-- AddForeignKey
ALTER TABLE "Dealer" ADD CONSTRAINT "Dealer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
