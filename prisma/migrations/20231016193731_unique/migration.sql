/*
  Warnings:

  - A unique constraint covering the columns `[postId,tagId]` on the table `post_tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_tag_postId_tagId_key" ON "post_tag"("postId", "tagId");
