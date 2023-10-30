const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/', require('../auth/middleware'), async (req, res, next) => {

    try{
        const exist = await prisma.vote.findFirst({
            where:{
                userId:  Number(req.user.id),
                commentId:  Number(req.body.commentId),
            }
        })

        if(exist){

            await prisma.vote.delete({
                where: {
                    id: exist.id,
                    userId:  Number(req.user.id),
                    commentId:  Number(req.body.commentId),
                }
            });
            if(exist.type!==req.body.type){
                await prisma.vote.create({
                    data: {
                        userId:  Number(req.user.id),
                        commentId:  Number(req.body.commentId),
                        type: req.body.type
                    }
                });
            }
        }else{
            await prisma.vote.create({
                data: {
                    userId:  Number(req.user.id),
                    commentId:  Number(req.body.commentId),
                    type: req.body.type
                }
            });
        }

        const comment =  await prisma.comment.findFirst({
            where:{
                id:req.body.commentId
            }
        })

        const finalPost = await prisma.post.findFirst({
            where: {
                id: comment.postId
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
        })
        res.send(finalPost)


    }catch(err){
        next(err)
    }
})

module.exports = router;