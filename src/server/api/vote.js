const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.delete("/:id",  async (req, res, next) =>{

    const vote = await prisma.vote.getFirst({
        where:{
            userId: req.body.userId,
            submissionId: req.params.id
        }
    })

    const deleteVote = await prisma.vote.delete({
        where:{
            id:vote.id
        }
    })

    res.send(deleteVote);

})


exports.module = router;