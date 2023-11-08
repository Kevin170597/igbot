import { PostModel } from "../models"
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
}