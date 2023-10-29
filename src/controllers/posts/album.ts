import { Request, Response } from "express"
import { addAlbumService, getAlbumService, getAllAlbumsService, deleteAlbumService } from "../../services"

export const getAllAlbums = async (req: Request, res: Response) => {
    const response = await getAllAlbumsService()
    res.send(response)
}

export const getAlbum = async (req: Request, res: Response) => {
    const day = req.query.day as string
    const hour = req.query.hour as string
    const response = await getAlbumService(req.params.username, day, hour)
    res.send(response)
}

export const addAlbum = async (req: Request, res: Response) => {
    const response = await addAlbumService(req.body)
    res.send(response)
}

export const deleteAlbum = async (req: Request, res: Response) => {
    const response = await deleteAlbumService(req.params.id)
    res.send(response)
}