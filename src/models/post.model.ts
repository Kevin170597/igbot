import { Schema, model, models } from "mongoose"
import { PostInterface } from "../interfaces"

const PostSchema = new Schema<PostInterface>(
    {
        type: {
            type: String,
            enum: ["album", "photo", "story"]
        },
        caption: {
            type: String
        },
        urls: {
            type: [String],
        },
        url: {
            type: String
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
        },
        posted: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: "ig-posts"
    }
)

export const PostModel = models["ig-posts"] || model("ig-posts", PostSchema)