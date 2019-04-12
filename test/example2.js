const type = require('../lib/sensorTag/SensorTagTypes');
const SensorTagFactory = require('../lib/sensorTag/SensorTagFactory');

SensorTagFactory.discoverById("a434f1f37d92", type.CC1350, (cc1350) => {
    console.log("My CC1350 Tag address is " + cc1350.address);

    process.on("SIGINT", () => {
        cc1350.dismantle((error) => {
            cc1350.disconnect((error) => {
                if (error) {
                    return console.log("Error in disconnecting");
                }
                console.log("Exiting now... Bye!");
                process.exit();
            });
        });
    });

    cc1350.initiate((error) => {
        if (error) {
            return console.error("Not Connected");
        }
        cc1350.lux(true, 1200, (lux) => {
            console.log("Lux Data : " + lux);
        }).humidity(true, 2550, (humidity) => {
            console.log("Humidity Data : " + humidity);
        }).ambientTemp(true, 2550);
    });

});
