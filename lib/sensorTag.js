const Device = require('noble-device-pg/lib/device');
const NobleDevice = require('noble-device');

class SensorTag extends Device {

    constructor(peripheral) {
        super(peripheral);
        this._nobleDevice = new NobleDevice(peripheral);
    }

    // get nobleDevice() {
    //     return this._nobleDevice;
    // }

    initiate(callback) {
        return this._nobleDevice.connectAndSetUp(callback);
    }

    enableService(service, callback){
        const serviceuuid = service.SERVICE_UUID;
        const configuuid = service.CONFIG_UUID;
        this._nobleDevice.writeUInt8Characteristic(serviceuuid, configuuid,
            0x01, callback);
        return this;
    }

    disableService(service, callback){
        const serviceuuid = service.SERVICE_UUID;
        const configuuid = service.CONFIG_UUID;
        this._nobleDevice.writeUInt8Characteristic(serviceuuid, configuuid,
            0x00, callback);
        return this;
    }

    period(service, period, callback){
        period /= 10; // input is scaled by units of 10ms

        if (period < 1) {
            period = 1;
        } else if (period > 255) {
            period = 255;
        }
        const serviceuuid = service.SERVICE_UUID;
        const configuuid = service.PERIOD_UUID;

        this._nobleDevice.writeUInt8Characteristic(serviceuuid, configuuid, period, callback);
        return this;
    }

    subscribeData(service, listener, callback){
        const serviceuuid = service.SERVICE_UUID;
        const datauuid = service.DATA_UUID;
        service.subscribe();
        this._nobleDevice.notifyCharacteristic(serviceuuid, datauuid, true,
            data => {
                    service.onData(data);
            }, callback);
        return this;
    }

}

module.exports = SensorTag;