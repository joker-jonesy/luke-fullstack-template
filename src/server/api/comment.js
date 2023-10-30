const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/', require('../auth/middleware'), async (req, res, next) => {
    try{
        await prisma.comment.create({
            data: {
                authorId:  Number(req.user.id),
                postId:Number(req.body.postId),
                text:  req.body.text
            }
        });

        const post = await prisma.post.findUnique({
            where: {
                id: Number(req.body.postId),
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
                        author:true,
                        vote:true
                    }
                }
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
                comment: {
                    include:{
                        author:true,
                        vote:true
                    }
                }
            }
        });
        res.send({post, allPosts})
    }catch(err){
        next(err)
    }

});

router.delete('/:id', require('../auth/middleware'), async (req, res, next) => {

    try {
        const comment = await prisma.comment.delete({
            where: {
                id: Number(req.params.id),
                authorId:  Number(req.user.id),
            }
        });
        const post = await prisma.post.findUnique({
            where: {
                id: Number(comment.postId)
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
                        author:true,
                        vote:true
                    }
                }
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
                comment: {
                    include:{
                        author:true,
                        vote:true
                    }
                }
            }
        });
        res.send({post, allPosts})
    } catch (err) {
        next(err)
    }
})

module.exports = router;