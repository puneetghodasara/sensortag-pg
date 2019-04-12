const SensorTag = require('./sensorTag/SensorTag');
const LuxometerService = require('./services/LuxometerService');
const HumidityService = require('./services/HumidityService');
const AmbientTemperatureService = require('./services/AmbientTemperatureService');

/**
 * TI SensorTag CC1350 @{link http://www.ti.com/tool/CC1350STK}
 *
 */

const LUX_SERVICE_UUID = 'f000aa7004514000b000000000000000';

const LUX_CONFIG_UUID = 'f000aa7204514000b000000000000000';
const LUX_DATA_UUID = 'f000aa7104514000b000000000000000';
const LUX_PERIOD_UUID = 'f000aa7304514000b000000000000000';

const HUMIDITY_SERVICE_UUID = 'f000aa2004514000b000000000000000';

const HUMIDITY_CONFIG_UUID = 'f000aa2204514000b000000000000000';
const HUMIDITY_DATA_UUID = 'f000aa2104514000b000000000000000';
const HUMIDITY_PERIOD_UUID = 'f000aa2304514000b000000000000000';

class CC1350 extends SensorTag {


    constructor(peripheral) {
        super(peripheral);
        this._luxometerService = new LuxometerService(LUX_SERVICE_UUID, LUX_CONFIG_UUID, LUX_PERIOD_UUID, LUX_DATA_UUID);
        this._humidityService = new HumidityService(HUMIDITY_SERVICE_UUID, HUMIDITY_CONFIG_UUID, HUMIDITY_PERIOD_UUID, HUMIDITY_DATA_UUID);
        this._ambientTemperatureService = new AmbientTemperatureService(HUMIDITY_SERVICE_UUID, HUMIDITY_CONFIG_UUID, HUMIDITY_PERIOD_UUID, HUMIDITY_DATA_UUID);
    }

    lux(stateSwitch, period, onServiceData) {
        if (stateSwitch) {
            this._luxometerService.addServiceDataListner(onServiceData);
            this.configure(this._luxometerService, period, (error) => {
            });
        } else {
            this.disfigure(this._luxometerService, (error) => {
            });
        }
        this._lux = stateSwitch;
        return this;
    }

    humidity(stateSwitch, period, onServiceData) {
        if (stateSwitch) {
            this._humidityService.addServiceDataListner(onServiceData);
            this.configure(this._humidityService, period, (error) => {
            });
        } else {
            this.disfigure(this._humidityService, (error) => {
            });
        }
        this._humidity = stateSwitch;
        return this;
    }

    ambientTemp(stateSwitch, period, onServiceData) {
        if (stateSwitch) {
            this._ambientTemperatureService.addServiceDataListner(onServiceData);
            this.configure(this._ambientTemperatureService, period, (error) => {
            });
        } else {
            this.disfigure(this._ambientTemperatureService, (error) => {
            });
        }
        this._ambientTemp = stateSwitch;
        return this;
    }

    dismantle(callback) {

        this.disfigure(this._luxometerService, (error) => {
            this.disfigure(this._humidityService, (error) => {
                this.disfigure(this._ambientTemperatureService, (error) => {
                    callback();
                });
            });
        });
    }

    get luxometerService() {
        return this._luxometerService;
    }

    get humidityService() {
        return this._humidityService;
    }

    get ambientTemperatureService() {
        return this._ambientTemperatureService;
    }

}

module.exports = CC1350;