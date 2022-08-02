import express, { Express, Request, Response } from "express"
import graphql from "graphql"
import { graphqlHTTP } from "express-graphql"

import cookieParser from "cookie-parser"
import cors from "cors"

import { schema } from "./schema.js"
import resolvers from "./resolvers.js"
import { connectToMongo, disconnectFromMongo } from "./database.js"

const app: Express = express()
const port = 3003

app.use(cors({
        origin: ["https://ss-react-frontend.vercel.app/", "https://ss-react-frontend.vercel.app"],
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser())

const root = resolvers

app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))


const server = app.listen(port, async () => {
    await connectToMongo()
    console.log("Express listening on port " + port)
})

process.on("SIGINT", async () => {

    server.close(async () => {
        await disconnectFromMongo()
        console.log("Server shutting down")
        process.exit(0)
    })
})

process.on("SIGTERM", async () => {
    server.close(async () => {
        await disconnectFromMongo()
        console.log("Server shutting down")
        process.exit(0)
    })
})