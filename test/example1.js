const type = require('../lib/type');
const SensorTagFactory = require('../lib/SensorTagFactory');

// CC1350.discoverFirstMe((cc1350)=>{
//     console.log("My CC130 address is " + cc1350.address)
// });

SensorTagFactory.discoverById("a434f1f37d92", type.CC1350,(cc1350)=>{
    console.log("My CC130 address is " + cc1350.address);
    cc1350.initiate((error) => {
        if (error) {
            console.log("Problem Connecting : " + error);
            return;
        }
        console.log("Connected");
    });
});
