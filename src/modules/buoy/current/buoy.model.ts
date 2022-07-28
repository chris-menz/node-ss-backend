export type BuoyDataArray = BuoyData[]

export interface BuoyData {
  "#YY": string
  MM: string
  DD: string
  hh: string
  mm: string
  WVHT: string
  SwH: string
  SwP: string
  WWH: string
  WWP: string
  SwD: string
  WWD: string
  STEEPNESS: string
  APD: string
  MWD: string
}

export interface ParsedBuoyData {
    timestamp: string
    swellHeight: string
    swellPeriod: string
    swellDirection: string
    windWaveHeight: string
    windWavePeriod: string
    windWaveDirection: string
}
