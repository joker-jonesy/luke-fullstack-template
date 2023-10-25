const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/:search', async (req, res, next) =>{
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
                        author:true,
                        vote:true
                    }
                }
            }
        });

        function checkTag (i){
            const found = i.post_tag.filter(x=>x.tag.name.includes(req.params.search))
            return found.length > 0;
        }

        const results = allPosts.filter(i=>i.text.includes(req.params.search)||checkTag(i))

        res.send(results);
    } catch (err){
        next(err)
    }
})

module.exports = router;