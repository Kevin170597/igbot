import { Request, Response } from "express"
import { addStoryService, getStoryService, getAllStoriesService } from "../../services"

export const getAllStories = async (req: Request, res: Response) => {
    const response = await getAllStoriesService()
    res.send(response)
}

export const getStory = async (req: Request, res: Response) => {
    const day = req.query.day as string
    const hour = req.query.hour as string
    const response = await getStoryService(req.params.username, day, hour)
    res.send(response)
}

export const addStory = async (req: Request, res: Response) => {
    const response = await addStoryService(req.body)
    res.send(response)
}