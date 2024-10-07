/*
  Warnings:

  - You are about to drop the column `user_id` on the `Role` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_user_id_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "user_id",
ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
