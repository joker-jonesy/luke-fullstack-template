/*
  Warnings:

  - You are about to drop the `post_comment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_comment" DROP CONSTRAINT "post_comment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "post_comment" DROP CONSTRAINT "post_comment_postId_fkey";

-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "postId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "post_comment";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
