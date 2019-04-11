const SensorTag = require('./sensorTag');

class CC1350 extends SensorTag {


    constructor(peripheral) {
        super(peripheral);
    }
}

module.exports = CC1350;