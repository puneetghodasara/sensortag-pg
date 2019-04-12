const BLEService = require('./BLEService');

class LuxometerService extends BLEService {

    static get SERVICE_NAME() {
        return "LuxometerService";
    }

    /**
     *
     * Creates an instance of Luxometer service
     * @param SERVICE_UUID
     * @param CONFIG_UUID
     * @param PERIOD_UUID
     * @param DATA_UUID
     * @param serviceDataListener (Optional)
     */
    constructor(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID, serviceDataListener) {
        super(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID, LuxometerService.SERVICE_NAME);
        if(serviceDataListener){
            this.onServiceData = serviceDataListener;
        }
    }

    convert(data) {
        const rawLux = data.readUInt16LE(0);

        const exponent = (rawLux & 0xF000) >> 12;
        const mantissa = (rawLux & 0x0FFF);

        return mantissa * Math.pow(2, exponent) / 100.0;
    }

    onServiceData(serviceDataValue) {
        console.log(this._SERVICE_NAME + " (Reading) : " + serviceDataValue + " lux");
    }
}

module.exports = LuxometerService;
