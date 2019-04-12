const Device = require('noble-device-pg/lib/device');

/**
 * @SensorTag contains methods related to TI SensorTAG and </br>
 * inherits Generic BLE Device
 */
class SensorTag extends Device {

    /**
     *
     * @param peripheral discovered from library nole
     */
    constructor(peripheral) {
        super(peripheral);
    }

    /**
     * Connects and discovers all services and initialize noble-
     * @param callback
     */
    initiate(callback) {
        let sensorTagThis = this;
        sensorTagThis.connect((error)=>{
           if(error){
               return callback(new Error(`Error connecting to device ${this.address}`));
           }
           console.debug(`[${this.address}] Connected.`);
           sensorTagThis.discover((error)=>{
               if(error){
                   return callback(new Error(`Error in discovering services from ${this.address}`));
               }
               console.debug(`[${this.address}] Services discovered.`);
               callback();
           });
        });
    }

    disconnect(callback) {
        console.debug(`[${this.address}] disconnected.`);
        super.disconnect(callback);
    }

    /**
     * Configures service with period and data would be sent to </br>
     * service's listener
     * @param service @{BLEService}
     * @param period
     * @param callback
     */
    configure(service, period = 1000, callback) {
        let sensorTagThis = this;
        sensorTagThis._enableService(service, (error) => {
            if (error) {
                return callback(new Error("Error enabling service " + error));
            }
            console.debug(`[${service._SERVICE_NAME}] Enabled`);

            sensorTagThis._period(service, period, (error) => {
                if (error) {
                    return callback(new Error("Error setting reading _period on service " + error));
                }
                console.debug(`[${service._SERVICE_NAME}] reading period set as ${period}`);

                sensorTagThis._subscribeData(service, (error) => {
                    if (error) {
                        return callback(new Error("Error subscribed service data" + error));
                    }
                    console.debug(`[${service._SERVICE_NAME}] subscribed to reading`);
                    callback(null);
                })
            })
        })
    }

    disfigure(service, callback) {
        let sensorTagThis = this;
        sensorTagThis._unsubscribeData(service, (error) => {
            if (error) {
                callback(new Error("Error unsubscribe service data" + error));
                return;
            }
            console.debug(`[${service._SERVICE_NAME}] unsubscribed from reading`);
            sensorTagThis._disableService(service, (error) => {
                if (error) {
                    callback(new Error("Error disabling service " + error));
                    return;
                }
                console.debug(`[${service._SERVICE_NAME}] service disabled.`);
                callback(null);
            });
        })
    }

    _enableService(service, callback) {
        this.writeUInt8Characteristic(service.SERVICE_UUID, service.CONFIG_UUID,
            0x01, callback);
    }

    _disableService(service, callback) {
        this.writeUInt8Characteristic(service.SERVICE_UUID, service.CONFIG_UUID,
            0x00, callback);
    }

    _period(service, period, callback) {
        period /= 10; // input is scaled by units of 10ms

        if (period < 1) {
            period = 1;
        } else if (period > 255) {
            period = 255;
        }

        this.writeUInt8Characteristic(service.SERVICE_UUID, service.PERIOD_UUID, period, callback);
    }

    _subscribeData(service, callback) {
        this.notifyCharacteristic(service.SERVICE_UUID, service.DATA_UUID, true,
            (data) => {
                service.onData(data);
            }, callback);
    }

    _unsubscribeData(service, callback) {
        this.notifyCharacteristic(service.SERVICE_UUID, service.DATA_UUID, false,
            (data) => {
                service.onData(data);
            }, callback);
    }

}

module.exports = SensorTag;