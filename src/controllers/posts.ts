import { Request, Response } from "express"
import {
    getAllPostsService,
    getPostService,
    getPostByIdService,
    addPostService,
    updatePostService,
} from "../services"

const serviceFunctions: { [key: string]: Function } = {
    getAllPosts: getAllPostsService,
    getPost: getPostService,
    getPostById: getPostByIdService,
    addPost: addPostService,
    updatePost: updatePostService,
}

const handleRequest = async (req: Request, res: Response, functionName: string) => {
    try {
        const { type, username, id } = req.params
        const { day, hour } = req.query
        const serviceFunction = serviceFunctions[functionName]

        if (!serviceFunction) {
            throw new Error("Invalid function name")
        }

        const response = await serviceFunction({
            type,
            username,
            day,
            hour,
            post: req.body,
            id
        })
        res.send(response)
    } catch (error) {
        res.send(error instanceof Error ? { error: error.message } : error)
    }
}

export const getAllPosts = async (req: Request, res: Response) =>
    await handleRequest(req, res, "getAllPosts")
export const getPost = async (req: Request, res: Response) =>
    await handleRequest(req, res, "getPost")
export const getPostById = async (req: Request, res: Response) =>
    await handleRequest(req, res, "getPostById")
export const addPost = async (req: Request, res: Response) =>
    await handleRequest(req, res, "addPost")
export const updatePost = async (req: Request, res: Response) =>
    await handleRequest(req, res, "updatePost")

/*import { Request, Response } from "express"
import {
    getAllPostsService,
    getPostService,
    getPostByIdService,
    addPostService,
    updatePostService
} from "../services"

type PostType = "album" | "photo" | "story"


export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const type = <"album" | "photo" | "story">req.params.type
        const response = await getAllPostsService(type)
        res.send(response)
    } catch (error) {
        if (error instanceof Error) res.send({ error: error.message })
        else res.send(error)
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const type = <"album" | "photo" | "story">req.params.type
        const username = req.params.username as string
        const day = req.query.day as string
        const hour = req.query.hour as string
        const response = await getPostService(type, username, day, hour)
        res.send(response)
    } catch (error) {
        if (error instanceof Error) res.send({ error: error.message })
        else res.send(error)
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {
        const type = <"album" | "photo" | "story">req.params.type
        const username = req.params.username as string
        const id = req.params.id as string
        const response = await getPostByIdService(type, username, id)
        res.send(response)
    } catch (error) {

    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const type = <"album" | "photo" | "story">req.params.type
        const body = req.body
        const response = await addPostService(type, body)
        res.send(response)
    } catch (error) {
        if (error instanceof Error) res.send({ error: error.message })
        else res.send(error)
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const type = <"album" | "photo" | "story">req.params.type
        const body = req.body
        const id = req.params.id as string
        const response = await updatePostService(type, body, id)
        res.send(response)
    } catch (error) {
        if (error instanceof Error) res.send({ error: error.message })
        else res.send(error)
    }
}*/