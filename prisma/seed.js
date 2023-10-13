const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const posts = [

    {
        text: "the coolest post ever",
        authorId: 1
    },
    {
        text: "the happiest post ever",
        authorId: 1
    },
    {
        text: "the silliest post ever",
        authorId: 1
    }
]

const generateData = async () => {

    const salt_rounds = 5;

    const hashedPassword = await bcrypt.hash("test123", salt_rounds);

    const exsistingUser = prisma.user.findUnique({
        id: 1
    })

    // if (exsistingUser) {
    //     await prisma.user.create({
    //         data: {
    //             username: "joker_jonesy",
    //             password: hashedPassword
    //         }
    //     })
    // } else {
    //     console.log("user exists")
    // }


    await prisma.post.createMany({
        data: posts
    })

}

generateData();
