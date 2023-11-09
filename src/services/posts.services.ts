import { PostModel } from "../models"
import { PostInterface } from "../interfaces"

interface Params {
    type: "album" | "photo" | "story"
    username?: string
    day?: string
    hour?: string
    id?: string
    post?: PostInterface
}

const validatePostType = (type: string) => {
    if (type !== "album" && type !== "photo" && type !== "story") {
        throw new Error("Invalid post type.")
    }
}

const validatePostUrls = (type: string, post: PostInterface) => {
    if (!post) throw new Error("Empty body.")
    if (type === "album" && (!post.urls || post.urls.length < 2)) {
        throw new Error("Property urls should have at least 2 urls.")
    }
    if (
        (type === "photo" || type === "story") &&
        (!post.url || typeof post.url !== "string")
    ) {
        throw new Error("Just one url is required")
    }
}

const validateRequiredFields = (fields: { [key: string]: any }) => {
    for (const key in fields) {
        if (!fields[key]) throw new Error(`${key} is required.`)
    }
}

export const getAllPostsService = async ({ type }: Params): Promise<PostInterface[]> => {
    validatePostType(type)
    const res = await PostModel.find({
        type,
        posted: { $ne: true }
    }, null, { sort: { _id: -1 } })
    if (!res) throw new Error("Not found.")
    return res
}

export const getPostService = async (
    {
        type,
        username,
        day,
        hour
    }: Params): Promise<PostInterface> => {
    validatePostType(type)
    validateRequiredFields({ type, username, day, hour })
    const res = await PostModel.findOne({ type, username, day, hour })
    if (!res) throw new Error("Not found.")
    return res
}

export const getPostByIdService = async ({ type, username, id }: Params) => {
    validatePostType(type)
    console.log(id)
    validateRequiredFields({ type, username, id })
    const res = await PostModel.findOne({ _id: id, type, username })
    if (!res) throw new Error("Not found.")
    return res
}

export const addPostService = async ({ type, post }: Params) => {
    if (!post) throw new Error("Post data is required.")
    validatePostType(type)
    validatePostUrls(type, post)
    validateRequiredFields({ type, post })
    post.type = type
    const res = await PostModel.create(post)
    return res
}

export const updatePostService = async ({ type, post, id }: Params) => {
    if (!post) throw new Error("Post data is required.")
    validatePostType(type)
    validatePostUrls(type, post)
    validateRequiredFields({ type, post, id })
    const res = await PostModel.updateOne({ _id: id, type }, post)
    return res
}

/*import { PostModel } from "../models"
import { PostInterface } from "../interfaces"

export const getAllPostsService = async (type: "album" | "photo" | "story"): Promise<PostInterface[]> => {
    if (type !== "album" && type !== "photo" && type !== "story") throw new Error("Invalid post type.")
    const res = await PostModel.find({ type, posted: { $ne: true } }, null, { sort: { _id: -1 } })
    if (!res) throw new Error("Not found.")
    return res
}

export const getPostService = async (type: "album" | "photo" | "story", username: string, day: string, hour: string): Promise<PostInterface> => {
    if (type !== "album" && type !== "photo" && type !== "story") throw new Error("Invalid post type.")
    if (!username) throw new Error("Username is required")
    if (!day) throw new Error("Day is required")
    if (!hour) throw new Error("Hour is required")
    const res = await PostModel.findOne({
        $and: [
            { "type": type },
            { "username": username },
            { "day": day },
            { "hour": hour }
        ]
    })
    if (!res) throw new Error("Not found.")
    return res
}

export const getPostByIdService = async (type: "album" | "photo" | "story", username: string, id: string) => {
    if (type !== "album" && type !== "photo" && type !== "story") throw new Error("Invalid post type.")
    if (!username) throw new Error("Username is required")
    if (!id) throw new Error("ID is required")
    const res = await PostModel.findOne({
        $and: [
            { "_id": id },
            { "type": type },
            { "username": username }
        ]
    })
    if (!res) throw new Error("Not found.")
    return res
}

export const addPostService = async (type: "album" | "photo" | "story", post: PostInterface) => {
    if (type !== "album" && type !== "photo" && type !== "story") throw new Error("Invalid post type.")
    if (type === "album" && (!post.urls || post.urls?.length <= 1)) throw new Error("Property urls should have almost 2 urls.")
    if ((type === "photo" || type === "story") && (!post.url || typeof post.url !== "string")) throw new Error("Just one url is required")
    post.type = type
    const res = await PostModel.create(post)
    return res
}

export const updatePostService = async (type: "album" | "photo" | "story", post: any, id: string) => {
    if (type !== "album" && type !== "photo" && type !== "story") throw new Error("Invalid post type.")
    if (type === "album" && (post.urls && post.urls?.length <= 1)) throw new Error("Property urls should have almost 2 urls.")
    if ((type === "photo" || type === "story") && (post.url || typeof post.url !== "string")) throw new Error("Just one url is required")
    const res = await PostModel.updateOne({ _id: id }, post)
    return res
}*/