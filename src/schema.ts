import { buildSchema, GraphQLSchema } from "graphql";

export const schema: GraphQLSchema = buildSchema( `
    type Query {
        BuoyData(buoyId: String): BuoyData
        SurfSpots: [SurfSpot]
        SurfSpot(_id: String): SurfSpot
        CurrentWeather(latlng: String): CurrentWeather
    }

    type Mutation {
        createSurfSpot(input: SurfSpotInput): SurfSpot
    }

    type BuoyData {
        buoyId: String
        measurements: [Measurement]
    }

    type Measurement {
        day: Int
        hour: Int
        minute: Int
        month: Int
        waveHeight: Float
        swellHeight: Float
        swellPeriod: Float
        windWaveHeight: Float
        windWavePeriod: Float
        swellDirection: String
        windWaveDirection: String
        steepness: String
        averagePeriod: Float
        meanWaveDirection: Int
        year: Int
    }

    type SurfSpot {
        _id: String
        spot: String
        location: String
        region: String
        latlng: String
        buoyId: String
    }

    input SurfSpotInput {
        _id: String
        spot: String
        location: String
        region: String
        latlng: String
        buoyId: String
    }

    type CurrentWeather {
        temp: Float,
        windgust: Float,
        windspeed: Float,
        winddir: Float,
        uvindex: Float,
        sunrise: String,
        sunset: String
    }

`)