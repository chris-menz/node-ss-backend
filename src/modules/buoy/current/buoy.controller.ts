import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ParsedBuoyData } from "./buoy.model.js";
import { getBuoyData } from "./buoy.service.js";

export default async function getCurrentBuoyDataHandler(req: Request, res: Response) {
    const {buoyId} = req.params

    const buoyData: ParsedBuoyData = await getBuoyData(buoyId)
    if (!buoyData){
        res.status(StatusCodes.BAD_REQUEST).send("Could not get buoy data")
    }
    
    res.status(StatusCodes.OK).send(buoyData)
}