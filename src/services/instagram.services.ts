import { IgApiClient } from "instagram-private-api"
import { get } from "request-promise"
import { StickerBuilder } from "instagram-private-api/dist/sticker-builder"

const ig = new IgApiClient()

export const igLogin = async (username: string, password: string) => {
    ig.state.generateDevice(username)
    return await ig.account.login(username, password)
}

interface ImageBuffer {
    file: Buffer
}

interface Params {
    username: string,
    urls?: string[],
    url?: string,
    caption?: string
}

const prepareImages = async (urls: string[] | string) => {
    if (typeof urls === "string") {
        return await get({ url: urls, encoding: null })
    } else {
        const imagesBuffer: ImageBuffer[] = []
        for (const url of urls) {
            const file = await get({ url, encoding: null })
            imagesBuffer.push(file)
        }
        return imagesBuffer
    }
}

const postService = async ({ username, urls, url, caption }: Params, isStory: boolean = false) => {
    const fixedName = username.split(".").join("").toUpperCase()
    await igLogin(username, process.env[`${fixedName}_IG_PASSWORD`] as string)

    let imageBuffer: Buffer | ImageBuffer[]
    if (url) {
        imageBuffer = await prepareImages(url)
    } else if (Array.isArray(urls)) {
        imageBuffer = await prepareImages(urls)
    } else {
        throw new Error("Invalid input.")
    }

    if (!imageBuffer) {
        throw new Error("Missing image data.")
    }

    if (Array.isArray(imageBuffer)) {
        return await ig.publish.album({ items: imageBuffer, caption })
    } else if (isStory) {
        return await ig.publish.story({ file: imageBuffer })
    } else {
        return await ig.publish.photo({ file: imageBuffer })
    }
}

export const postAlbumService = async ({ username, urls, caption }: Params) => {
    if (!urls) throw new Error("Missing urls.")
    return await postService({ username, urls, caption })
}

export const postPhotoService = async ({ username, url, caption }: Params) => {
    if (!url) throw new Error("Missing url.")
    return await postService({ username, url, caption })
}

export const postStoryService = async ({ username, url }: Params) => {
    if (!url) throw new Error("Missing url.")
    return await postService({ username, url }, true)
}



/*export const postAlbumService = async (username: string, urls: string[], caption?: string) => {
    const fixedName = username.split(".").join("").toUpperCase()
    await igLogin(username, process.env[`${fixedName}_IG_PASSWORD`] as string)

    let imagesBuffer: { file: Buffer }[] = []

    for (const url of urls) {
        const file = await get({ url, encoding: null })
        imagesBuffer.push({ file })
    }

    const publishResult = await ig.publish.album({
        items: imagesBuffer,
        caption
    })

    return publishResult
}

export const postPhotoService = async (username: string, url: string, caption?: string) => {
    const fixedName = username.split(".").join("").toUpperCase()
    await igLogin(username, process.env[`${fixedName}_IG_PASSWORD`] as string)

    const imageBuffer = await get({
        url,
        encoding: null
    })

    const publishResult = await ig.publish.photo({
        file: imageBuffer,
        caption
    })

    return publishResult
}

export const postStoryService = async () => {
    let username = "bullworth.pics"
    const fixedName = username.split(".").join("").toUpperCase()
    await igLogin(username, process.env[`${fixedName}_IG_PASSWORD`] as string)

    const imageBuffer = await get({
        url: "https://drive.google.com/uc?export=view&id=1_XPDACZ41zPeDoOpkJdIByJzYuFkzfoT",
        encoding: null
    })

    const publishResult = await ig.publish.story({
        file: imageBuffer,
        stickerConfig: new StickerBuilder()
            .add(StickerBuilder.attachmentFromMedia(
                (await ig.feed.timeline().items())[0]
            ).center().scale(2))
            .add(StickerBuilder.chat({ text: "Give a <3" }))
            .build(),
        caption: "Hey there..."
    })

    return publishResult
}*/