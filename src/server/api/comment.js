const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/', require('../auth/middleware'), async (req, res, next) => {
    const comment = await prisma.comment.create({
        data: {
            authorId:  Number(req.body.userId),
            text:  Number(req.body.text)
        }
    });

    await prisma.post_comment.create({
        data: {
            postId:  Number(req.body.postId),
            commentId:  Number(comment.id)
        }
    });

    const allPosts = await prisma.post.findMany({
        include: {
            post_tag: {
                include: {
                    tag: true
                }
            },
            author: true,
            like: true,
            post_comment:{
                include:{
                    comment:true
                }
            }
        }
    });
    res.send(allPosts)
});

module.exports = router;