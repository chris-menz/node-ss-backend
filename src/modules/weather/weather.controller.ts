import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getWeather } from "./weather.service"
import { Weather } from "./weather.model";

export async function getWeatherHandler(req: Request, res: Response){
    const {latlng} = req.params
    const weather: Weather = await getWeather(latlng)
    if (!weather) {
        return res.status(StatusCodes.BAD_REQUEST).send("Could not fetch weather")
    }
    return res.status(StatusCodes.OK).send(weather)
}
