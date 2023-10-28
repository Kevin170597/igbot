import { Router } from "express"
import { addAlbum, getAllAlbums, getAlbum, addPhoto, getAllPhotos, getPhoto, addStory, getAllStories, getStory } from "../controllers"

const router = Router()

router.get("/album/all", getAllAlbums)
router.get("/album/:username", getAlbum)
router.post("/album/add", addAlbum)

router.get("/photo/all", getAllPhotos)
router.get("/photo/:username", getPhoto)
router.post("/photo/add", addPhoto)

router.get("/story/all", getAllStories)
router.get("/story/:username", getStory)
router.post("/story/add", addStory)

export { router }