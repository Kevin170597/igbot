import { Request, Response } from "express"
import {
    updatePostService,
    postAlbumService,
    postPhotoService,
    getPostService,
    postStoryService
} from "../services"
import moment from "moment"

type PostType = "album" | "photo" | "story"

const handlePost = async (req: Request, res: Response, type: PostType, postService: Function) => {
    try {
        const username = req.params.username as string
        const hour = req.query.hour as string
        const day = moment().format("DD/MM/YYYY")

        const post = await getPostService({ type, username, day, hour })
        if (!post || (type === "album" && !post.urls) || (type === "photo" && !post.url)) {
            throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} not found!`)
        }

        const publish = await postService({
            username,
            type,
            caption: post.caption,
            url: post.url,
            urls: post.urls
        })

        await updatePostService({
            type,
            post: { posted: true },
            id: post._id || ""
        })

        res.send({ username, day, hour, publish })
    } catch (error) {
        res.send(error instanceof Error ? { error: error.message } : error)
    }
}

export const postAlbum = async (req: Request, res: Response) =>
    handlePost(req, res, "album", postAlbumService)
export const postPhoto = async (req: Request, res: Response) =>
    handlePost(req, res, "photo", postPhotoService)
export const postStory = async (req: Request, res: Response) =>
    handlePost(req, res, "story", postStoryService)


/*export const postAlbum = async (req: Request, res: Response) => {
    try {
        const username = req.params.username as string
        const hour = req.query.hour as string
        const day = moment().format("DD/MM/YYYY")

        const album = await getPostService({ type: "album", username, day, hour })
        if (!album) throw new Error("Album not found!")
        if (!album.urls) throw new Error("Property urls not found.")
        const publish = await postAlbumService(username, album.urls, album.caption)
        const update = await updatePostService({
            type: "album",
            post: { posted: true },
            id: (album._id ? album._id : "")
        })
        console.log(update)
        res.send({ username, day, hour, publish })
    } catch (error) {
        if (error instanceof Error) res.send({ error: error.message })
        else res.send(error)
    }
}

export const postPhoto = async (req: Request, res: Response) => {
    try {
        const username = req.params.username as string
        const hour = req.query.hour as string
        const day = moment().format("DD/MM/YYYY")

        const photo = await getPostService({ type: "photo", username, day, hour })
        if (!photo) throw new Error("Photo not found!")
        if (!photo.url) throw new Error("Photo not found!")
        const publish = await postPhotoService(username, photo.url, photo.caption)
        res.send({ username, day, hour, publish })
    } catch (error) {
        if (error instanceof Error) res.send({ error: error.message })
        else res.send(error)
    }
}

export const postStory = async (req: Request, res: Response) => {
    try {
        const publish = await postStoryService()
        res.send(publish)
    } catch (error) {
        if (error instanceof Error) res.send({ error: error.message })
        else res.send(error)
    }
}*/