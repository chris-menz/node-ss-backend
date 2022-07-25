import { fetchBuoyRealTimeData, BuoyData, BuoyRealTimeDataOptions } from 'buoy-kit';
require('isomorphic-fetch');

export async function getBuoy(buoyID: string): Promise<BuoyData> {
  let buoyData: BuoyData;
  let buoy: BuoyRealTimeDataOptions = {
    buoyID
  }
  
    buoyData = await fetchBuoyRealTimeData(buoy);
    return buoyData

  
}