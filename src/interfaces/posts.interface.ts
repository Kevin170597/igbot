export interface PostInterface {
    _id?: string,
    type: "album" | "photo" | "story",
    caption: string,
    urls?: string[],
    url?: string,
    username: string,
    day: string,
    hour: string,
    posted: boolean
}