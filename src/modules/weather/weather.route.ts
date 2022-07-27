import express from "express"
import { getWeatherHandler } from "./weather.controller"

const router = express.Router()

router.get("/:latlng", getWeatherHandler)

export default router