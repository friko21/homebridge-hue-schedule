var Schedule = require('./bin/schedule.js');
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
    
    setPowerState: function (targetService, powerState, callback, context) {
        log('setPowerState');
        this.services.forEach(function (switchService, i) {
            if (i === 0) {
                return;
            }
            if (targetService.subtype === switchService.subtype) {
                if (powerState) {
                    this.schedules[i].setOn();
                } else {
                    this.schedules[i].setOff();
                }
            }
        }.bind(this));
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
            this.schedules.push(new Schedule(this.log, config, this.host, this.user));
            var switchName = config.name;
            var switchService = new Service.Switch(switchName, switchName);
            var boundSetPowerState = this.setPowerState.bind(this, switchService);
            switchService
                .getCharacteristic(Characteristic.On)
                .on('set', boundSetPowerState);
            this.services.push(switchService);   
        }
        
        return this.services;
    },
}
