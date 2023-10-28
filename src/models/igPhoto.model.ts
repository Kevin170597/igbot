import { Schema, model, models } from "mongoose"
import { IgPhotoInterface } from "../interfaces"

const IgPhotoSchema = new Schema<IgPhotoInterface>(
    {
        caption: {
            type: String
        },
        url: {
            type: String,
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
        collection: "ig-photos"
    }
)

export const IgPhotoModel = models["ig-photos"] || model("ig-photos", IgPhotoSchema)