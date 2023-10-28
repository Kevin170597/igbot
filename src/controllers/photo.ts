import { Request, Response } from "express"
import { addPhotoService, getPhotoService, getAllPhotosService } from "../services"

export const getAllPhotos = async (req: Request, res: Response) => {
    const response = await getAllPhotosService()
    res.send(response)
}

export const getPhoto = async (req: Request, res: Response) => {
    const day = req.query.day as string
    const hour = req.query.hour as string
    const response = await getPhotoService(req.params.username, day, hour)
    res.send(response)
}

export const addPhoto = async (req: Request, res: Response) => {
    const response = await addPhotoService(req.body)
    res.send(response)
}