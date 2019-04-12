const CC1350 = require('../cc1350');
const SensorType = require('./SensorTagTypes');
const NobleDeviceFactory = require('noble-device-pg/lib/deviceFactory');

/**
 * A Factory class to get an instance of particular </br>
 * TI SensorTag </br>
 */
class SensorTagFactory {

    static discoverById(id, type, callback) {
        new NobleDeviceFactory()._discoverWithFilter((device) => {
            return device.serviceUuids.includes('aa80') && device.id === id;
        }, (device) => {
            const instance = SensorTagFactory.getInstance(type, device.peripheral);
            callback(instance);
        });
    }

    static getInstance(sensorType, peripheral) {
        switch (sensorType) {
            case SensorType.CC1350:
                return new CC1350(peripheral);
            case SensorType.CC2650:
                // TODO change
                return new CC1350(peripheral);
        }
    }
}

module.exports = SensorTagFactory;