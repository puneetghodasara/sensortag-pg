const BLEService = require('./BLEService');

class HumidityService extends BLEService {

    static get SERVICE_NAME() {
        return "HumidityService";
    }

    /**
     *
     * Creates an instance of HumidityService
     * @param SERVICE_UUID
     * @param CONFIG_UUID
     * @param PERIOD_UUID
     * @param DATA_UUID
     * @param serviceDataListener (Optional)
     */
    constructor(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID) {
        super(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID, HumidityService.SERVICE_NAME);
    }

    convert(data) {
        // var temperature = -40 + ((165  * data.readUInt16LE(0)) / 65536.0);
        const humidity = data.readUInt16LE(2) * 100 / 65536.0;

        return humidity;
    }

    onServiceData(serviceDataValue) {
        console.log(this._SERVICE_NAME + " (Reading) : " + serviceDataValue + " %");
    }
}

module.exports = HumidityService;
