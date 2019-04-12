const BLEService = require('./BLEService');

class AmbientTemperatureService extends BLEService {

    static get SERVICE_NAME() {
        return "AmbientTemperatureService";
    }

    /**
     *
     * Creates an instance of AmbientTemperatureService
     * @param SERVICE_UUID
     * @param CONFIG_UUID
     * @param PERIOD_UUID
     * @param DATA_UUID
     * @param serviceDataListener (Optional)
     */
    constructor(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID, serviceDataListener) {
        super(SERVICE_UUID, CONFIG_UUID, PERIOD_UUID, DATA_UUID, AmbientTemperatureService.SERVICE_NAME);
        if(serviceDataListener){
            this.onServiceData = serviceDataListener;
        }
    }

    convert(data) {
        const temperature = -40 + ((165  * data.readUInt16LE(0)) / 65536.0);
        // var humidity = data.readUInt16LE(2) * 100 / 65536.0;

        return temperature;
    }

    onServiceData(serviceDataValue) {
        console.log(this._SERVICE_NAME + " (Reading) : " + serviceDataValue + " ^C");
    }
}

module.exports = AmbientTemperatureService;
