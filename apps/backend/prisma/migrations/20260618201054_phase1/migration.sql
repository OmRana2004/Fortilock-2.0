/*
  Warnings:

  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `accountNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `alternateMobileNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhoto` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `ifscCode` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `aadharCard` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `aadharCardNumber` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `dealerName` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `gstCertificate` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `gstCertificateNumber` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `panCard` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `panCardNumber` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `shopAddress` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfEstablishment` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Dealer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopName` to the `Dealer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPER_ADMIN', 'DEALER', 'CUSTOMER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropIndex
DROP INDEX "Customer_mobileNumber_key";

-- DropIndex
DROP INDEX "Dealer_aadharCardNumber_key";

-- DropIndex
DROP INDEX "Dealer_mobileNumber_key";

-- DropIndex
DROP INDEX "Dealer_panCardNumber_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "accountNumber",
DROP COLUMN "alternateMobileNumber",
DROP COLUMN "bankName",
DROP COLUMN "customerName",
DROP COLUMN "customerPhoto",
DROP COLUMN "dateOfBirth",
DROP COLUMN "email",
DROP COLUMN "gender",
DROP COLUMN "ifscCode",
DROP COLUMN "mobileNumber",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Dealer" DROP COLUMN "aadharCard",
DROP COLUMN "aadharCardNumber",
DROP COLUMN "contactPerson",
DROP COLUMN "dateOfBirth",
DROP COLUMN "dealerName",
DROP COLUMN "gender",
DROP COLUMN "gstCertificate",
DROP COLUMN "gstCertificateNumber",
DROP COLUMN "mobileNumber",
DROP COLUMN "panCard",
DROP COLUMN "panCardNumber",
DROP COLUMN "shopAddress",
DROP COLUMN "yearOfEstablishment",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "shopName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "photo",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "Gender";
