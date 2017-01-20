var schedule = require('node-schedule');
var hue = require("node-hue-api");

var Service, Characteristic;




module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-weather", "Weather", WeatherAccessory);
}
