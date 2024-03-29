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


app.use(express.json())
app.use(cookieParser())

const root = resolvers

app.use(cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//   app.use("/graphql", function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     if (req.method === 'OPTIONS') {
//       res.sendStatus(200);
//     } else {
//       next();
//     }
//   });



app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
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