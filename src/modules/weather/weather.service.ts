import { Request, Response } from "express"
import { VisualCrossingWeather, CurrentConditions, Weather } from "./weather.model.js"
import axios from "axios"

export async function getWeather(latlng: string) {
    const lat = latlng.split(",")[0]
    const lng = latlng.split(",")[1]
    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${lng}?unitGroup=us&key=U6NDBMJ9T3R5MAAA6DWZZ6K2S&contentType=json`)

    const visualCrossingWeather: VisualCrossingWeather = response.data
    const currentConditions: CurrentConditions = visualCrossingWeather.currentConditions

    //extract desired fields from API
    const weather: Weather = {
        temp: currentConditions.temp,
        windgust: currentConditions.windgust,
        windspeed: currentConditions.windspeed,
        winddir: currentConditions.winddir,
        uvindex: currentConditions.uvindex,
        sunrise: currentConditions.sunrise,
        sunset: currentConditions.sunset
    }

    return weather
}



