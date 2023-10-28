import { Schema, model, models } from "mongoose"
import { IgAlbumInterface } from "../interfaces"

const IgAlbumSchema = new Schema<IgAlbumInterface>(
    {
        caption: {
            type: String
        },
        urls: {
            type: [String],
            required: true
        },
        username: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        },
        hour: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: "ig-albums"
    }
)

export const IgAlbumModel = models["ig-albums"] || model("ig-albums", IgAlbumSchema)