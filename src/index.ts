import express, { Express, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { getBuoy } from "./modules/buoy/buoy"
import { BuoyData } from "buoy-kit"

const app: Express = express()
const port = 3003

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", async (req: Request, res: Response) => {
    const buoyData: BuoyData = await getBuoy("44097")
    res.send(buoyData)
})

const server = app.listen(port, () => {
    console.log("Express listening on port " + port)
})

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server shutting down")
        process.exit(0)
    })
})

process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Server shutting down")
        process.exit(0)
    })
})