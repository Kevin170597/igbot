import { Router } from "express"
import { postAlbum, postPhoto } from "../controllers"

const router = Router()

router.get("/album/:username", postAlbum)
router.get("/photo", postPhoto)

export { router }