import { Request, Response } from "express"
import { postAlbumService, postPhotoService, getAlbumService, getPhotoService  } from "../services"
import moment from "moment"

export const postAlbum = async (req: Request, res: Response) => {
    try {
        const username = req.params.username as string
        const hour = req.query.hour as string
        const day = moment().format("DD/MM/YYYY")

        const album = await getAlbumService(username, day, hour)
        if (!album) throw new Error("Album not found!")
        const publish = await postAlbumService(username, album.urls, album.caption)
        // await moveToPosted(album)
        // await deleteAlbum(album._id)
        res.send({ day, username, hour, publish })
    } catch (error) {
        res.send(error)
    }
}

export const postPhoto = async (req: Request, res: Response) => {
    try {
        const username = req.params.username as string
        const hour = req.query.hour as string
        const day = moment().format("DD/MM/YYYY")

        const { url, caption } = await getPhotoService(username, day, hour)
        if (!url || !caption) throw new Error("Photo not found!")
        const publish = await postPhotoService(username, url, caption)
        res.send({ url, caption, publish })
    } catch (error) {
        res.send(error)
    }
}