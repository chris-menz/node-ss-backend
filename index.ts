const express = require("express")
const app = express()
const port = 8080

app.get("/", (req, res, next) => {
    res.send("hello world")
})

app.listen(port)