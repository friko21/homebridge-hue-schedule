var Service, Characteristic;
var log;
var host;
var user;
var schedules;
var scheduleConfig;


module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-hue-schedule', 'Hue-Schedule', HueSchedule);
}


function HueSchedule (homebridgeLog, config) {
    this.log = homebridgeLog;
    this.host = config.host;
    this.user = config.user;
    this.schedules = [];
    this.scheduleConfig = config.schedules;
    
}


HueSchedule.prototyp = {
    
    identify: function (callback) {
        log('Identify requested!');
        callback();
    },
    
    
    getServices: function () {
        log('getServices');
        this.services = [];
        
        var informationService = new Service.AccessoryInformation();
        informationService
            .setCharacteristic(Characteristic.Manufacturer, 'Hue Schedule')
            .setCharacteristic(Characteristic.Model, 'Version 0.0.1')
            .setCharacteristic(Characteristic.SerialNumber, '');
        this.services.push(informationService);
        
        this.scheduleConfig.forEach( function(config) {
            
            
            
            
        }
        
        return this.services;
    },
}
