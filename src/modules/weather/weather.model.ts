export interface Weather {
    temp: number
    windgust?: number
    windspeed: number
    winddir: number
    // visibility: number
    uvindex: number
    // conditions: string
    // icon: string
    sunrise: string
    sunset: string
}

export interface VisualCrossingWeather {
    queryCost: number
    latitude: number
    longitude: number
    resolvedAddress: string
    address: string
    timezone: string
    tzoffset: number
    description: string
    days: Day[]
    alerts: any[]
    stations: Stations
    currentConditions: CurrentConditions
  }
  
  export interface Day {
    datetime: string
    datetimeEpoch: number
    tempmax: number
    tempmin: number
    temp: number
    feelslikemax: number
    feelslikemin: number
    feelslike: number
    dew: number
    humidity: number
    precip: number
    precipprob: number
    precipcover: number
    preciptype?: string[]
    snow: number
    snowdepth: number
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    cloudcover: number
    visibility: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    severerisk: number
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
    conditions: string
    description: string
    icon: string
    stations?: string[]
    source: string
    hours: Hour[]
  }
  
  export interface Hour {
    datetime: string
    datetimeEpoch: number
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precip: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype?: string[]
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number
    solarenergy?: number
    uvindex: number
    severerisk: number
    conditions: string
    icon: string
    stations?: string[]
    source: string
  }
  
  export interface Stations {
    KPVD: Kpvd
    KBID: Kbid
    C6451: C6451
    KEWB: Kewb
    E8410: E8410
    WCE5063: Wce5063
    KUUU: Kuuu
    KWST: Kwst
  }
  
  export interface Kpvd {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface Kbid {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface C6451 {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface Kewb {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface E8410 {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface Wce5063 {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface Kuuu {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface Kwst {
    distance: number
    latitude: number
    longitude: number
    useCount: number
    id: string
    name: string
    quality: number
    contribution: number
  }
  
  export interface CurrentConditions {
    datetime: string
    datetimeEpoch: number
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precip: number
    precipprob: any
    snow: number
    snowdepth: number
    preciptype: any
    windgust: any
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    conditions: string
    icon: string
    stations: string[]
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
  }
  