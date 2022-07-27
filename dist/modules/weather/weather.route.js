import express from "express";
import { getWeatherHandler } from "./weather.controller";
var router = express.Router();
router.get("/:latlng", getWeatherHandler);
export default router;
