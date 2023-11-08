import { Request, Response } from "express"
import { updatePostService, postAlbumService, postPhotoService, getPostService, postStoryService  } from "../services"
import moment from "moment"

export const postAlbum = async (req: Request, res: Response) => {
    try {
        const username = req.params.username as string
        const hour = req.query.hour as string
        const day = moment().format("DD/MM/YYYY")

        const album = await getPostService("album", username, day, hour)
        if (!album) throw new Error("Album not found!")
        if (!album.urls) throw new Error("Property urls not found.")
        const publish = await postAlbumService(username, album.urls, album.caption)
        const update = await updatePostService("album", { posted: true }, (album._id ? album._id : ""))
        console.log(update)
        res.send({ username, day, hour,  })
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

        const photo = await getPostService("photo", username, day, hour)
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
}