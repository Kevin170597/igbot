import { IgAlbumModel } from "../../models"
import { IgAlbumInterface } from "../../interfaces"

export const getAlbumService = async (username: string, day: string, hour: string): Promise<IgAlbumInterface> => {
    const response = await IgAlbumModel.findOne({
        $and: [
            { "username": username },
            { "day": day },
            { "hour": hour }
        ]
    })
    return response
}

export const getAllAlbumsService = async (): Promise<IgAlbumInterface[]> => {
    const response = await IgAlbumModel.find()
    return response
}

export const addAlbumService = async (album: IgAlbumInterface) => {
    const response = await IgAlbumModel.create(album)
    return response
}

export const deleteAlbumService = async (_id: string) => {
    const response = await IgAlbumModel.deleteOne({ _id })
}