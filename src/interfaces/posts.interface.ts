export interface PostInterface {
    type: "album" | "photo" | "story",
    caption: string,
    urls?: string[],
    url?: string,
    username: string,
    day: string,
    hour: string
}