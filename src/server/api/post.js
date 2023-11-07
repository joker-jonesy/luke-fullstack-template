const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
    try {
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
                    include: {
                        author: true,
                        vote: true
                    }
                }
            }
        });
        res.send(allPosts)
    } catch (err) {
        next(err)
    }
})

router.get('/page/:num', async (req, res, next) => {
    try {

        const page = Number(req.params.num);
        const skip = (4 * page);

        let result = await prisma.post.findMany({
                skip: skip,
                take: 5,
                include: {
                    post_tag: {
                        include: {
                            tag: true
                        }
                    },
                    author: true,
                    like: true,
                    comment: {
                        include: {
                            author: true,
                            vote: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            }
        );


        res.send(result);


    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: Number(req.params.id)
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
                    include: {
                        author: true,
                        vote: true
                    }
                }
            }
        });
        res.send(post)
    } catch (err) {
        next(err)
    }
})


router.delete('/:id', require('../auth/middleware'), async (req, res, next) => {

    try {
        const post = await prisma.post.delete({
            where: {
                id: Number(req.params.id),
                authorId: Number(req.user.id)
            }
        });


        res.send(post)
    } catch (err) {
        next(err)
    }
})


router.post('/', require('../auth/middleware'), async (req, res, next) => {

    try {

        const post = await prisma.post.create({
            data: {
                text: req.body.text,
                authorId: req.user.id
            }
        })

        const convertedItems = req.body.tags.map((i) => {
            return {
                postId: post.id,
                tagId: i.id
            }
        })

        const relations = await prisma.post_tag.createMany({
            data: convertedItems
        })

        const finalPost = await prisma.post.findFirst({
            where: {
                id: post.id
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
                    include: {
                        author: true
                    }
                }
            }
        })
        res.send(finalPost)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', require('../auth/middleware'), async (req, res, next) => {

    try {
        const post = await prisma.post.update({
            where: {
                id: Number(req.params.id),
                authorId: Number(req.user.id)
            },
            data: {
                text: req.body.text
            }
        })

        await prisma.post_tag.deleteMany({
            where: {
                postId: Number(req.params.id)
            },
        })

        await prisma.post_tag.createMany({
            data: req.body.tags.map((i) => {
                return {
                    postId: post.id,
                    tagId: i.id
                }
            })
        })

        const finalPost = await prisma.post.findFirst({
            where: {
                id: post.id
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
                    include: {
                        author: true
                    }
                }
            }
        })

        res.send(finalPost)
    } catch (err) {
        next(err)
    }
})


module.exports = router;