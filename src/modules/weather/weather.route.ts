import express from "express"
import { getWeatherHandler } from "./weather.controller.js"

const router = express.Router()

router.get("/:latlng", getWeatherHandler)

export default router