import { SpecBuoyData, Measurement } from './buoy.specModel.js'

/**
 * Raw fields as defined in NBDC data sets. We use this for validation to ensure
 * we don't encounter any unexpected values that we don't know how to map.
 */
enum RawRealtimeSpecField {
  '#YY' = '#YY',

  DD = 'DD',
  hh = 'hh',
  mm = 'mm',
  MM = 'MM',
  WVHT = 'WVHT',
  SwH = 'SwH',
  SwP = 'SwP',
  WWH = 'WWH',
  WWP = 'WWP',
  SwD = 'SwD',
  WWD = 'WWD',
  STEEPNESS = 'STEEPNESS',
  APD = 'APD',
  MWD = "MWD",
  /**
   * Special value we add to handle fields we might encounter that  we don't yet
   * support.
   */
  UNKNOWN = 'unknown',
}

/**
 * Parses the first row of a NDBC realtime file to determine the order
 * of fields in the column.
 */
export function getFieldOrderList(rawFieldOrder: string): RawRealtimeSpecField[] {
  // there are an arbitrary number of spaces between measurements which is why
  // we split on one or more white-spaces
  const splitFields = rawFieldOrder.split(/\s+/);

  return splitFields.map(field => {
    switch (field) {
      case '#YY':
        return RawRealtimeSpecField['#YY'];

      case RawRealtimeSpecField.DD:
        return RawRealtimeSpecField.DD;
      case RawRealtimeSpecField.hh:
        return RawRealtimeSpecField.hh;
      case RawRealtimeSpecField.mm:
        return RawRealtimeSpecField.mm;
      case RawRealtimeSpecField.MM:
        return RawRealtimeSpecField.MM;
      case RawRealtimeSpecField.SwH:
        return RawRealtimeSpecField.SwH;
      case RawRealtimeSpecField.SwP:
        return RawRealtimeSpecField.SwP;
      case RawRealtimeSpecField.WWH:
        return RawRealtimeSpecField.WWH;
      case RawRealtimeSpecField.WWP:
        return RawRealtimeSpecField.WWP;
      case RawRealtimeSpecField.SwD:
        return RawRealtimeSpecField.SwD;
      case RawRealtimeSpecField.WWD:
        return RawRealtimeSpecField.WWD;
      case RawRealtimeSpecField.WVHT:
        return RawRealtimeSpecField.WVHT;
      case RawRealtimeSpecField.STEEPNESS:
        return RawRealtimeSpecField.STEEPNESS;
      case RawRealtimeSpecField.APD:
        return RawRealtimeSpecField.APD;
      case RawRealtimeSpecField.MWD:
        return RawRealtimeSpecField.MWD;
      default: {
        console.error(
          `Encountered unexpected NDBC real-time data field: ${field}`,
        );
        return RawRealtimeSpecField.UNKNOWN;
      }
    }
  });
}

/**
 * Creates a new measurement object with uninitialized values.
 */
export function createMeasurement(): Measurement {
  return {
    day: Number.NaN,
    hour: Number.NaN,
    minute: Number.NaN,
    month: Number.NaN,
    waveHeight: Number.NaN,
    swellHeight: Number.NaN,
    swellPeriod: Number.NaN,
    windWaveHeight: Number.NaN,
    windWavePeriod: Number.NaN,
    swellDirection: "",
    windWaveDirection: "",
    steepness: "",
    averagePeriod: Number.NaN,
    meanWaveDirection: Number.NaN,
    year: Number.NaN,
  };
}

/**
 * Parses a measurement for a white-space separated measurement string and an
 * expected ordering of field.
 */
export function parseMeasurement(
  rawMeasurement: string,
  fieldOrderList: RawRealtimeSpecField[],
): Measurement | null {
  // there are an arbitrary number of spaces between measurements which is why
  // we split on one or more white-spaces
  const fields = rawMeasurement.split(/\s+/);
  const measurement = createMeasurement();

  // Ensure that the row we are parsing has the same number of fields as we
  // expect based on the file's column labelling
  if (fields.length !== fieldOrderList.length) {
    console.error('Row has unexpected number of fields', {
      fieldOrderList,
      rowFields: fields,
    });
    return null;
  }

  fields.forEach((value, index) => {
    const field = fieldOrderList[index];

    switch (field) {
      case RawRealtimeSpecField['#YY']:
        measurement.year = +value;
        break;
      case RawRealtimeSpecField.APD:
        measurement.averagePeriod = +value;
        break;
      case RawRealtimeSpecField.SwH:
        measurement.swellHeight = +value;
        break;
      case RawRealtimeSpecField.DD:
        measurement.day = +value;
        break;
      case RawRealtimeSpecField.SwP:
        measurement.swellPeriod = +value;
        break;
      case RawRealtimeSpecField.WWH:
        measurement.windWaveHeight = +value;
        break;
      case RawRealtimeSpecField.WWP:
        measurement.windWavePeriod = +value;
        break;
      case RawRealtimeSpecField.hh:
        measurement.hour = +value;
        break;
      case RawRealtimeSpecField.mm:
        measurement.minute = +value;
        break;
      case RawRealtimeSpecField.MM:
        measurement.month = +value;
        break;
      case RawRealtimeSpecField.MWD:
        measurement.meanWaveDirection = +value;
        break;
      case RawRealtimeSpecField.SwD:
        measurement.swellDirection= value;
        break;
      case RawRealtimeSpecField.WWD:
        measurement.windWaveDirection = value;
        break;
      case RawRealtimeSpecField.STEEPNESS:
        measurement.steepness = value;
        break;
      case RawRealtimeSpecField.WVHT:
        measurement.waveHeight = +value;
        break;
      default: {
        // we don't know what this field is, skip it
      }
    }
  });

  return measurement;
}

/**
 * Splits a buoy data file into individual rows.
 */
export function splitRows(rawData: string): string[] {
  return rawData.split('\n').filter(row => row !== '');
}

/**
 * Parses a NDBC real-time buoy file and returns formatted data.
 */
export function parseBuoyData(buoyId: string, rawData: string): SpecBuoyData {
  const rawDataRows = splitRows(rawData);
  const fieldOrderList = getFieldOrderList(rawDataRows[0]);

  const data: SpecBuoyData = {
    buoyId,
    measurements: [],
  };

  // iterate over data rows, skip row 0 (labels) and 1 (measurement unit for labels).
  for (let r = 2; r < rawDataRows.length; r++) {
    const row = rawDataRows[r];
    const measurement = parseMeasurement(row, fieldOrderList);

    // If nothing went wrong with parsing, push it into the set
    if (measurement) {
      data.measurements.push(measurement);
    }
  }

  return data;
}