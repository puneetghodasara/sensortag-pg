# TI Sensor Tag Node.JS Library (ES6 Class based)

This Library helps to connect, subscribe to data for various sensor services offered by TI SensorTags (http://www.ti.com/tools-software/sensortag.html) over BLE (Bluetooth Low Energy).

## Depends On
- noble-device-pg
- noble

## Quick Example
Example file [here](/test/example2.js) for CC1350 (Similar to CC2650) is given.

## Usage
- Use [SensorTagFactory](/lib/sensorTag/SensorTagFactory.js) to get an instance of SensorTag (e.g. CC1350, CC2650, etc)
```javascript
SensorTagFactory.discoverById(mycc1350Id, type.CC1350, (cc1350) => {
  // Do something with cc1350
});
```
- Use wrapper methods of [SensorTag.js](/lib/sensorTag/SensorTag.js) to instantiate the SensorTag.
```javascript
cc1350.initiate((error)=>{
  // If error is undefined, it is connected and services are discovered in noble
});
```
- Chain services to enable them with specific reading period and an optional callback for (converted) sensor data.
```javascript
cc1350
  .lux(true, 100)     // Default printing for light sensor
  .ambientTemp(true, 200, (temp)=>{
      // convert temp and print
  });
```

## Advanced
- To add one or more callbacks, get particular service and call addServiceDataListner.
```javascript
const luxService = cc1350.luxometerService();
luxService.addListener((luxData)=>{
   // Send over MQTT, REST,  
});

```
