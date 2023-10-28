import { connect } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error("Define  MongoDB enviroment variable!")

export const dbConnect = async () => {
    await connect(MONGODB_URI, { dbName: "igcron" })
}