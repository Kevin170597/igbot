import { Request, Response } from "express"
import { postAlbumService, postPhotoService, getAlbumService, getPhotoService  } from "../services"
import moment from "moment"

export const postAlbum = async (req: Request, res: Response) => {
    try {
        const username = req.params.username as string
        const hour = req.query.hour as string
        const day = moment().format("DD/MM/YYYY")

        //const { urls, caption } = await getAlbumService(username, day, hour)
        //const publish = await postAlbumService(username, urls, caption)
        res.send({ day, username, hour })
    } catch (error) {
        res.send(error)
    }
}

export const postPhoto = async (req: Request, res: Response) => {
    try {
        const username = req.query.username as string
        const day = req.query.day as string
        const hour = req.query.hour as string

        const { url, caption } = await getPhotoService(username, day, hour)
        const publish = await postPhotoService(username, url, caption)
        res.send({ url, caption, publish })
    } catch (error) {
        res.send(error)
    }
}