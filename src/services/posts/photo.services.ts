import { IgPhotoModel } from "../../models"
import { IgPhotoInterface } from "../../interfaces"

export const getPhotoService = async (username: string, day: string, hour: string): Promise<IgPhotoInterface> => {
    const response = await IgPhotoModel.findOne({
        $and: [
            { "username": username },
            {"day": day },
            {"hour": hour }
        ]
    })
    return response
}

export const getAllPhotosService = async (): Promise<IgPhotoInterface[]> => {
    const response = await IgPhotoModel.find({})
    return response
}

export const addPhotoService = async (photo: IgPhotoInterface) => {
    const response = await IgPhotoModel.create(photo)
    return response
}