import express, { Express, Request, Response } from "express"

const app: Express = express()
const port = 3003

app.get("/", (req: Request, res: Response) => {
    res.send("ss dev server!!!")
})

app.listen(port)