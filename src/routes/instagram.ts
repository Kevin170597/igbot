import { Router } from "express"
import { postAlbum, postPhoto, postStory } from "../controllers"

const router = Router()

router.get("/album/:username", postAlbum)
router.get("/photo/:username", postPhoto)
router.get("/story", postStory)

export { router }