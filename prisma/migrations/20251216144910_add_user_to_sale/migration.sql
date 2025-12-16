/*
  Warnings:

  - The primary key for the `SaleItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SaleItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SaleItem_id_seq";
