const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/', require('../auth/middleware'), async (req, res, next) => {

    try{
        const exist = await prisma.like.findFirst({
            where:{
                userId:  Number(req.user.id),
                postId:  Number(req.body.postId),
            }
        })

        if(exist){

            await prisma.like.delete({
                where: {
                    id: exist.id,
                    userId:  Number(req.user.id),
                    postId:  Number(req.body.postId),
                }
            });
            if(exist.type!==req.body.type){
                await prisma.like.create({
                    data: {
                        userId:  Number(req.user.id),
                        postId:  Number(req.body.postId),
                        type: req.body.type
                    }
                });
            }
        }else{
            await prisma.like.create({
                data: {
                    userId:  Number(req.user.id),
                    postId:  Number(req.body.postId),
                    type: req.body.type
                }
            });
        }

        const finalPost = await prisma.post.findFirst({
            where: {
                id: req.body.postId
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