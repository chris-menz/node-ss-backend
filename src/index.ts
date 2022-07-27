import express, { Express, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import weatherRoute from "./modules/weather/weather.route.js"

const app: Express = express()
const port = 3003

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", async (req: Request, res: Response) => {
    res.send("hello")
})

app.use("weather", weatherRoute)

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