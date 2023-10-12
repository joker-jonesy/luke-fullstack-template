-- AlterTable
ALTER TABLE "post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_tag" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "post_tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
