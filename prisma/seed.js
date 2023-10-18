const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const posts = [

    {
        text: "the coolest post ever",
        authorId: 1
    },
    {
        text: "the silliest post ever",
        authorId: 1
    },
    {
        text: "the stupidest post ever",
        authorId: 1
    }
]

const tags = [

    {
        name: "cool",

    },
    {
        text: "silly",

    },
    {
        text: "stupid",
    }
]

const post_tags = [
    {
        postId:1,
        tagId:1
    },
    {
        postId:2,
        tagId:2
    },
    {
        postId:3,
        tagId:3
    }
]

const likes =[
    {
        postId:1,
        userId:1,
        type:"like"
    }
]

const generateData = async () => {

    const salt_rounds = 5;

    const hashedPassword = await bcrypt.hash("test123", salt_rounds);

    const exsistingUser = prisma.user.findUnique({
        id: 1
    })

    if (exsistingUser) {
        await prisma.user.create({
            data: {
                username: "joker_jonesy",
                password: hashedPassword
            }
        })
    } else {
        console.log("user exists")
    }


    await prisma.post.createMany({
        data: posts
    })

    await prisma.tag.createMany({
        data: tags
    })
    await prisma.post_tag.createMany({
        data: post_tags
    })


}

generateData();
