import { IgApiClient } from "instagram-private-api"
import { get } from "request-promise"

const ig = new IgApiClient()

export const igLogin = async (username: string, password: string) => {
    ig.state.generateDevice(username)
    return await ig.account.login(username, password)
}

export const postAlbumService = async (username: string, urls: string[], caption: string) => {
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

export const postPhotoService = async (username: string, url: string, caption: string) => {
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