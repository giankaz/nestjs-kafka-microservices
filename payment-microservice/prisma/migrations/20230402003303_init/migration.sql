/*
  Warnings:

  - You are about to drop the column `user_id` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
