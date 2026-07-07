/*
  Warnings:

  - A unique constraint covering the columns `[aadharNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[panNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "aadharCard" TEXT,
ADD COLUMN     "aadharNumber" TEXT,
ADD COLUMN     "panCard" TEXT,
ADD COLUMN     "panNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_aadharNumber_key" ON "Customer"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_panNumber_key" ON "Customer"("panNumber");
