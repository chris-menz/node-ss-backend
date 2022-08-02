import { ObjectID } from "bson"
import { getBuoyData } from "./modules/buoy/current/buoy.service.js"
import { SurfSpotClass } from "./modules/surfSpot/surfSpot.model.js"
import { createSurfSpot, getSurfSpotById, getSurfSpots } from "./modules/surfSpot/surfSpot.service.js"
import { getWeather } from "./modules/weather/weather.service.js"

type Buoy = {
    buoyId: string
}

type Input = {
    input: {
        spot: string,
        location: string,
        region: string,
        latlng: string,
        buoyId: string
    }
}

type LatLngInput = {
    latlng: string
}

const resolvers = {
    BuoyData: (buoy: Buoy) => {
        return getBuoyData(buoy.buoyId)
    },
    SurfSpots: () => {
        return getSurfSpots()
    },

    SurfSpot: (_id: ObjectID) => {
        return getSurfSpotById(_id)
    },

    CurrentWeather: (latlng: LatLngInput) => {
        return getWeather(latlng.latlng)
    },

    createSurfSpot: async (input: Input) => {
        const {
            spot,
            location,
            region,
            latlng,
            buoyId
        } = input.input
        const newSurfSpot = {
            spot,
            location,
            region,
            latlng,
            buoyId
        }
        createSurfSpot(newSurfSpot)
        return newSurfSpot
    }
}

export default resolvers