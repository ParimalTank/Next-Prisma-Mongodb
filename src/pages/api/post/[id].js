import prisma from "../../../../utils/prisma";

export default async function handle(req, res) {
    const postId = req.query.id

    if (req.method === 'GET') {
        handleGET(postId, res)
    } else if (req.method === 'DELETE') {
        handleDELETE(postId, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// GET /api/post/:id
async function handleGET(postId, res) {
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { author: true },
    })
    res.json(post)
}

// DELETE /api/post/:id
async function handleDELETE(postId, res) {
    const post = await prisma.post.delete({
        where: { id: postId },
    })
    res.json(post)
}