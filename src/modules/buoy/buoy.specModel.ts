// Schema: https://www.ndbc.noaa.gov/mods.shtml


  
export interface Measurement {
  day: Number
  hour: Number
  minute: Number
  month: Number
  waveHeight: Number
  swellHeight: Number
  swellPeriod: Number
  windWaveHeight: Number
  windWavePeriod: Number
  swellDirection: string
  windWaveDirection: string
  steepness: string
  averagePeriod: Number
  meanWaveDirection: Number
  year: Number
}

export interface SpecBuoyData {
  buoyId: string;
  /**
   * 30 minute slices of Buoy data from latest to oldest.
   */
  measurements: Measurement[];
}
