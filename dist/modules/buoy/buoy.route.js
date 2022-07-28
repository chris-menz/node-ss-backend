import express from "express";
import getCurrentBuoyDataHandler from "./current/buoy.controller.js";
var router = express.Router();
router.get("/current/:buoyId", getCurrentBuoyDataHandler);
export default router;
