import { Schema, model, models } from "mongoose"
import { IgStoryInterface } from "../interfaces"

const IgStorySchema = new Schema<IgStoryInterface>(
    {
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
        collection: "ig-stories"
    }
)

export const IgStoryModel = models["ig-stories"] || model("ig-stories", IgStorySchema)