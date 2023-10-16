const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try{
        const allPosts = await prisma.post.findMany({
            include:{
                post_tag:{
                    include:{
                        tag:true
                    }
                },
                author:true
            }
        });
        res.send(allPosts)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const post = await prisma.post.findUnique({
            where:{
                id: Number(req.params.id)
            },
            include:{
                post_tag:{
                    include:{
                        tag:true
                    }
                },
                author:true
            }

        });
        console.log(post);
        res.send(post)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', require('../auth/middleware'), async (req,res,next)=>{

    if(!req.user){
        res.send("not logged in")
        return;
    }

    try{
        const post = await prisma.post.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(post)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next)=>{
    try{

        const post = await prisma.post.create({
            data: {
                text: req.body.text,
                authorId: req.body.authorId
            }
        })

        const convertedItems = req.body.tags.map((i)=>{
            return {
                postId: post.id,
                tagId: i.id
            }
        })

        const relations = await prisma.post_tag.createMany({
            data: convertedItems
        })

        const finalPost = await prisma.post.findFirst({
            where:{
                id:post.id
            },
            include:{
                post_tag:{
                    include:{
                        tag:true
                    }
                },
                author:true
            }
        })
        res.send(finalPost)
    }catch(err){
        next(err)
    }
})

router.put('/:id', async (req,res,next)=>{
    try{
        const post = await prisma.post.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body,
            include:{
                post_tag:{
                    include:{
                        tag:true
                    }
                },
                author:true
            }

        })

        res.send(post)
    }catch(err){
        next(err)
    }
})


module.exports = router;