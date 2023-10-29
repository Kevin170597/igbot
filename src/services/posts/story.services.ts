import { IgStoryModel } from "../../models"
import { IgStoryInterface } from "../../interfaces"

export const getStoryService = async (username: string, day: string, hour: string): Promise<IgStoryInterface> => {
    const response = await IgStoryModel.findOne({
        $and: [
            { "username": username },
            {"day": day },
            {"hour": hour }
        ]
    })
    return response
}

export const getAllStoriesService = async (): Promise<IgStoryInterface[]> => {
    const response = await IgStoryModel.find({})
    return response
}

export const addStoryService = async (album: IgStoryInterface) => {
    const response = await IgStoryModel.create(album)
    return response
}