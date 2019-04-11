class BLEService {
    _SERVICE_UUID;
    _CONFIG_UUID;
    _PERIOD_UUID;
    _DATA_UUID;

    constructor(serviceUuid, configUuid, periodUuid, dataUuid){
        this._SERVICE_UUID = serviceUuid;
        this._CONFIG_UUID = configUuid;
        this._PERIOD_UUID = periodUuid;
        this._DATA_UUID = dataUuid;
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

    subscribe(){
        return;
    }

    onData(data){

    }
}

module.exports = BLEService;