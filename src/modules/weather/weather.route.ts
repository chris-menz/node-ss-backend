import express from "express"
import { getWeatherHandler } from "./weather.controller.js"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("weather")
})

router.get("/:latlng", getWeatherHandler)

export default router