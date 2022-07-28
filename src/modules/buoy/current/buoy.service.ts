import axios from "axios"
import txtToJson from "txt-file-to-json"
import { BuoyData, ParsedBuoyData } from "./buoy.model.js"

export async function getBuoyData(buoyId: string) {
    const response = await axios.get(`https://www.ndbc.noaa.gov/data/realtime2/${buoyId}.spec`)

    // extract most current data from response array (0 index is table headers)
    const buoyData: BuoyData = txtToJson({data: response.data})[1]

    const parsedBuoyData: ParsedBuoyData = {
        timestamp: parseDateIntoTimestamp(buoyData["#YY"], buoyData.MM, buoyData.DD, buoyData.hh, buoyData.mm),
        swellHeight: buoyData.SwH,
        swellPeriod: buoyData.SwP,
        swellDirection: buoyData.SwD,
        windWaveHeight: buoyData.WWH,
        windWavePeriod: buoyData.WWP,
        windWaveDirection: buoyData.WWD
    }

    return parsedBuoyData

}

function parseDateIntoTimestamp(year: string, month: string, day: string, hour: string, minute: string){
    return(`${year}-${month}-${day}T${hour}:${minute}Z`)
}