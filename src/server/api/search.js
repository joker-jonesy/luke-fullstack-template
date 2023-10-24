const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/', async (req, res, next) =>{
    try{
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
                        author:true
                    }
                }
            }
        });

        function checkTag (i){
            const found = i.post_tag.filter(x=>x.tag.name.includes(req.body.input))
            return found.length > 0;
        }

        const results = allPosts.filter(i=>i.text.includes(req.body.input)||checkTag(i))

        res.send(results);
    } catch (err){
        next(err)
    }
})

module.exports = router;