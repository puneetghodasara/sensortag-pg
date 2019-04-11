
var SERVICE_UUID             = 'f000aa7004514000b000000000000000';

var CONFIG_UUID              = 'f000aa7204514000b000000000000000';
var DATA_UUID                = 'f000aa7104514000b000000000000000';
var PERIOD_UUID              = 'f000aa7304514000b000000000000000';


SensorTagCommon.prototype.writePeriodCharacteristic = function(serviceUuid, characteristicUuid, period, callback) {
    period /= 10; // input is scaled by units of 10ms

    if (period < 1) {
        period = 1;
    } else if (period > 255) {
        period = 255;
    }

    this.writeUInt8Characteristic(serviceUuid, characteristicUuid, period, callback);
};

SensorTagCommon.prototype.setIrTemperaturePeriod = function(period, callback) {
    this.writePeriodCharacteristic(IR_TEMPERATURE_UUID, IR_TEMPERATURE_PERIOD_UUID, period, callback);
};

SensorTagCommon.prototype.enableIrTemperature = function(callback) {
    this.enableConfigCharacteristic(IR_TEMPERATURE_UUID, IR_TEMPERATURE_CONFIG_UUID, callback);
};

SensorTagCommon.prototype.disableIrTemperature = function(callback) {
    this.disableConfigCharacteristic(IR_TEMPERATURE_UUID, IR_TEMPERATURE_CONFIG_UUID, callback);
};

SensorTagCommon.prototype.readIrTemperature = function(callback) {
    this.readDataCharacteristic(IR_TEMPERATURE_UUID, IR_TEMPERATURE_DATA_UUID, function(error, data) {
        if (error) {
            return callback(error);
        }

        this.convertIrTemperatureData(data, function(objectTemperature, ambientTemperature) {
            callback(null, objectTemperature, ambientTemperature);
        }.bind(this));
    }.bind(this));
};

SensorTagCommon.prototype.onIrTemperatureChange = function(data) {
    this.convertIrTemperatureData(data, function(objectTemperature, ambientTemperature) {
        this.emit('irTemperatureChange', objectTemperature, ambientTemperature);
    }.bind(this));
};

SensorTagCommon.prototype.notifyIrTemperature = function(callback) {
    this.notifyCharacteristic(IR_TEMPERATURE_UUID, IR_TEMPERATURE_DATA_UUID, true, this.onIrTemperatureChangeBinded, callback);
};

SensorTagCommon.prototype.unnotifyIrTemperature = function(callback) {
    this.notifyCharacteristic(IR_TEMPERATURE_UUID, IR_TEMPERATURE_DATA_UUID, false, this.onIrTemperatureChangeBinded, callback);
};

SensorTagCommon.prototype.setIrTemperaturePeriod = function(period, callback) {
    this.writePeriodCharacteristic(IR_TEMPERATURE_UUID, IR_TEMPERATURE_PERIOD_UUID, period, callback);
};

SensorTagCommon.prototype.setHumidityPeriod = function(period, callback) {
    this.writePeriodCharacteristic(HUMIDITY_UUID, HUMIDITY_PERIOD_UUID, period, callback);
};

SensorTagCommon.prototype.enableHumidity = function(callback) {
    this.enableConfigCharacteristic(HUMIDITY_UUID, HUMIDITY_CONFIG_UUID, callback);
};

SensorTagCommon.prototype.disableHumidity = function(callback) {
    this.disableConfigCharacteristic(HUMIDITY_UUID, HUMIDITY_CONFIG_UUID, callback);
};

SensorTagCommon.prototype.readHumidity = function(callback) {
    this.readDataCharacteristic(HUMIDITY_UUID, HUMIDITY_DATA_UUID, function(error, data) {
        if (error) {
            return callback(error);
        }

        this.convertHumidityData(data, function(temperature, humidity) {
            callback(null, temperature, humidity);
        });
    }.bind(this));
};

SensorTagCommon.prototype.onHumidityChange = function(data) {
    this.convertHumidityData(data, function(temperature, humidity) {
        this.emit('humidityChange', temperature, humidity);
    }.bind(this));
};

SensorTagCommon.prototype.notifyHumidity = function(callback) {
    this.notifyCharacteristic(HUMIDITY_UUID, HUMIDITY_DATA_UUID, true, this.onHumidityChangeBinded, callback);
};

SensorTagCommon.prototype.unnotifyHumidity = function(callback) {
    this.notifyCharacteristic(HUMIDITY_UUID, HUMIDITY_DATA_UUID, false, this.onHumidityChangeBinded, callback);
};

SensorTagCommon.prototype.setBarometricPressurePeriod = function(period, callback) {
    this.writePeriodCharacteristic(BAROMETRIC_PRESSURE_UUID, BAROMETRIC_PRESSURE_PERIOD_UUID, period, callback);
};

SensorTagCommon.prototype.disableBarometricPressure = function(callback) {
    this.disableConfigCharacteristic(BAROMETRIC_PRESSURE_UUID, BAROMETRIC_PRESSURE_CONFIG_UUID, callback);
};

SensorTagCommon.prototype.readBarometricPressure = function(callback) {
    this.readDataCharacteristic(BAROMETRIC_PRESSURE_UUID, BAROMETRIC_PRESSURE_DATA_UUID, function(error, data) {
        if (error) {
            return callback(error);
        }

        this.convertBarometricPressureData(data, function(pressure) {
            callback(null, pressure);
        }.bind(this));
    }.bind(this));
};

SensorTagCommon.prototype.onBarometricPressureChange = function(data) {
    this.convertBarometricPressureData(data, function(pressure) {
        this.emit('barometricPressureChange', pressure);
    }.bind(this));
};

SensorTagCommon.prototype.notifyBarometricPressure = function(callback) {
    this.notifyCharacteristic(BAROMETRIC_PRESSURE_UUID, BAROMETRIC_PRESSURE_DATA_UUID, true, this.onBarometricPressureChangeBinded, callback);
};

SensorTagCommon.prototype.unnotifyBarometricPressure = function(callback) {
    this.notifyCharacteristic(BAROMETRIC_PRESSURE_UUID, BAROMETRIC_PRESSURE_DATA_UUID, false, this.onBarometricPressureChangeBinded, callback);
};

SensorTagCommon.prototype.onSimpleKeyChange = function(data) {
    this.convertSimpleKeyData(data, function(/*left, right, ...*/) {
        var emitArguments = Array.prototype.slice.call(arguments);
        emitArguments.unshift('simpleKeyChange');

        this.emit.apply(this, emitArguments);
    }.bind(this));
};

SensorTagCommon.prototype.convertSimpleKeyData = function(data, callback) {
    var b = data.readUInt8(0);

    var left = (b & 0x2) ? true : false;
    var right = (b & 0x1) ? true : false;

    callback(left, right);
};

SensorTagCommon.prototype.notifySimpleKey = function(callback) {
    this.notifyCharacteristic(SIMPLE_KEY_UUID, SIMPLE_KEY_DATA_UUID, true, this.onSimpleKeyChangeBinded, callback);
};

SensorTagCommon.prototype.unnotifySimpleKey = function(callback) {
    this.notifyCharacteristic(SIMPLE_KEY_UUID, SIMPLE_KEY_DATA_UUID, false, this.onSimpleKeyChangeBinded, callback);
};

module.exports = SensorTagCommon;


class LuxometerService {


}

module.exports = LuxometerService;
