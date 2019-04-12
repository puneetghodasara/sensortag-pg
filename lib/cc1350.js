const SensorTag = require('./sensorTag/SensorTag');
const LuxometerService = require('./services/LuxometerService');
const HumidityService = require('./services/HumidityService');
const AmbientTemperatureService = require('./services/AmbientTemperatureService');
const PressureService = require('./services/PressureService');

const SensorTagTypes = require('./sensorTag/SensorTagTypes');

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

const PRESSURE_SERVICE_UUID = 'f000aa4004514000b000000000000000';
const PRESSURE_CONFIG_UUID = 'f000aa4204514000b000000000000000';
const PRESSURE_DATA_UUID = 'f000aa4104514000b000000000000000';
const PRESSURE_PERIOD_UUID = 'f000aa4404514000b000000000000000';


class CC1350 extends SensorTag {


    constructor(peripheral) {
        super(peripheral);
        this._type = SensorTagTypes.CC1350;

        this._luxometerService = new LuxometerService(LUX_SERVICE_UUID, LUX_CONFIG_UUID, LUX_PERIOD_UUID, LUX_DATA_UUID);
        this._humidityService = new HumidityService(HUMIDITY_SERVICE_UUID, HUMIDITY_CONFIG_UUID, HUMIDITY_PERIOD_UUID, HUMIDITY_DATA_UUID);
        this._ambientTemperatureService = new AmbientTemperatureService(HUMIDITY_SERVICE_UUID, HUMIDITY_CONFIG_UUID, HUMIDITY_PERIOD_UUID, HUMIDITY_DATA_UUID);
        this._pressureService = new PressureService(PRESSURE_SERVICE_UUID, PRESSURE_CONFIG_UUID, PRESSURE_PERIOD_UUID, PRESSURE_DATA_UUID);
    }

    lux(stateSwitch, period, onServiceData) {
        return this._generic(this._luxometerService, stateSwitch, period, onServiceData);
    }

    humidity(stateSwitch, period, onServiceData) {
        return this._generic(this._humidityService, stateSwitch, period, onServiceData);
    }

    ambientTemp(stateSwitch, period, onServiceData) {
        return this._generic(this._ambientTemperatureService, stateSwitch, period, onServiceData);
    }

    pressure(stateSwitch, period, onServiceData) {
        return this._generic(this._pressureService, stateSwitch, period, onServiceData);
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

    _generic(serviceObj, stateSwitch, period, onServiceData) {
        if ((typeof stateSwitch === 'boolean' && stateSwitch === true)
            || (typeof stateSwitch === 'string' &&
                (stateSwitch.includes('on') || stateSwitch.includes('true')))) {
            serviceObj.addServiceDataListner(onServiceData);
            this.configure(serviceObj, period, (error) => {
            });
        } else {
            this.disfigure(serviceObj, (error) => {
            });
        }
        return this;
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