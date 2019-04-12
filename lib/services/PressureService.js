const BLEService = require('./BLEService');

class PressureService extends BLEService {

    static get SERVICE_NAME() {
        return "PressureService";
    }

    /**
     *
     * Creates an instance of PressureService
     * @param SERVICE_UUID
     * @param CONFIG_UUID
     * @param PERIOD_UUID
     * @param DATA_UUID
     */
    constructor(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID) {
        super(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID, PressureService.SERVICE_NAME);
    }

    convert(data) {

        const flPressure = ((data.readUInt32LE(2) >> 8) & 0x00ffffff) / 100.0;

        return flPressure;
    }

    onServiceData(serviceDataValue) {
        console.log(this._SERVICE_NAME + " (Reading) : " + serviceDataValue + " bar");
    }
}

module.exports = PressureService;
