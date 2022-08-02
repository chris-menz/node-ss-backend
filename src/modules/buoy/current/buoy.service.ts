import axios, { AxiosResponse } from "axios"
import { parseBuoyData } from "../buoy.specDataParser.js"
import { SpecBuoyData, Measurement } from "../buoy.specModel.js"

export async function getBuoyData(buoyId: string) {
    const specBuoyData: SpecBuoyData = await fetchAndParseSpecBuoyData(buoyId) 

    if(!specBuoyData){
        return null
    }

    return specBuoyData
}

async function fetchAndParseSpecBuoyData(buoyId: string) {
    const endpoint = `https://www.ndbc.noaa.gov/data/realtime2/${buoyId}.spec`

    const response: AxiosResponse = await axios.get(endpoint)
    const specBuoyData: SpecBuoyData = parseBuoyData(buoyId, response.data)

    return specBuoyData
}

function parseDateIntoTimestamp(year: string, month: string, day: string, hour: string, minute: string){
    return(`${year}-${month}-${day}T${hour}:${minute}Z`)
}