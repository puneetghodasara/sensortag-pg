const EventEmitter = require('events');

class BLEService {

    constructor(serviceUuid, configUuid, periodUuid, dataUuid, serviceName) {
        this._SERVICE_UUID = serviceUuid;
        this._CONFIG_UUID = configUuid;
        this._PERIOD_UUID = periodUuid;
        this._DATA_UUID = dataUuid;
        this._SERVICE_NAME = serviceName;
        this._eventEmitter = new EventEmitter();
        // Add default data printer
        this._eventEmitter.on(this._SERVICE_NAME + "Data", this.onServiceData);
    }

    get SERVICE_UUID() {
        return this._SERVICE_UUID;
    }

    get CONFIG_UUID() {
        return this._CONFIG_UUID;
    }

    get PERIOD_UUID() {
        return this._PERIOD_UUID;
    }

    get DATA_UUID() {
        return this._DATA_UUID;
    }

    /**
     * On getting hardware data, converts to service data and </br>
     * emits an event with "Data" as suffix over service name.</br>
     * @param data
     */
    onData(data) {
        let serviceDataValue = this.convert(data);
        this._eventEmitter.emit(this._SERVICE_NAME + "Data", serviceDataValue);
    }

    /**
     * Default conversion is return the data as is. </br>
     * Subclass has to override accordingly.
     * @param data
     * @returns {*}
     */
    convert(data) {
        return data;
    }

    /**
     * Default listener </br>
     * Subclass has to override accordingly.
     * @param serviceDataValue
     */
    onServiceData(serviceDataValue) {
        console.log("Generic (Reading) : " + serviceDataValue);
    }

    addServiceDataListner(listener){
        if(this._eventEmitter.listeners(this._getDataEmitterLiteral()).length === 1){
            // If it is default one, we remove that
            this._eventEmitter.off(this._getDataEmitterLiteral(), this.onServiceData);
        }
        this._eventEmitter.on(this._getDataEmitterLiteral(), listener);
    }

    _getDataEmitterLiteral() {
        return this._SERVICE_NAME + "Data";
    }
}

module.exports = BLEService;