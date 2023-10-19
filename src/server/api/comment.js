const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/', require('../auth/middleware'), async (req, res, next) => {
    await prisma.comment.create({
        data: {
            authorId:  Number(req.body.authorId),
            postId:Number(req.body.postId),
            text:  req.body.text
        }
    });

    const post = await prisma.post.findUnique({
        where: {
            id: Number(req.body.postId)
        },
        include: {
            post_tag: {
                include: {
                    tag: true
                }
            },
            author: true,
            like: true,
            comment: {
                include:{
                    author:true
                }
            }
        }
    });
    res.send(post)
});

module.exports = router;