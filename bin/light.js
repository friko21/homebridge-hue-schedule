var hue = require('node-hue-api');

var log;
var lightid;
var transitionTime;
var action;
var hue;
var saturation;
var brightness;


function Light(homebridgeLog, config) {
    this.log = homebridgeLog;
    this.lightid = config.lightid;
    this.transitionTime = config.transitionTime;
    this.action = config.action;
    this.hue = config.hsb.hue;
    this.saturation = config.hsb.saturation;
    this.brightness = config.hsb.brightness;
}


Light.prototype = {
    
    sendCommand: function () {
        
    }
}
