import "dotenv/config"
import express, { Express, Request, Response, Application } from "express"
import { router } from "./routes"
import { dbConnect } from "./lib"

const PORT = 3001
const app: Application = express()
app.use(express.json())
app.use(router)

app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
})

dbConnect().then(() => console.log("db connected"))

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
