import { Request, Response } from "express"
import { getAllPostsService, getPostService, getPostByIdService, addPostService, updatePostService } from "../services"

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
}