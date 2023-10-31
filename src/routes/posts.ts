import { Router } from "express"
import { getAllPosts, getPost, getPostById, addPost } from "../controllers"

const router = Router()

router.get("/:type/all", getAllPosts)
router.get("/:type/:username", getPost)
router.get("/:type/:username/:id", getPostById)
router.post("/:type/add", addPost)

export { router }