export interface IgAlbumInterface {
    _id?: string,
    caption: string,
    urls: string[],
    username: string,
    day: string,
    hour: string
}

export interface IgPhotoInterface {
    caption: string,
    url: string,
    username: string,
    day: string,
    hour: string
}

export interface IgStoryInterface {
    url: string,
    username: string,
    day: string,
    hour: string
}