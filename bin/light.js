var hue = require('node-hue-api'),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var log;
var lightid;
var transitionTime;
var action;
var hue;
var saturation;
var brightness;
var api;
var state;


function Light(homebridgeLog, config, host, user) {
    this.log = homebridgeLog;
    this.lightid = config.lightid;
    this.transitionTime = config.transitionTime;
    this.action = config.action;
    this.hue = config.hsb.hue;
    this.saturation = config.hsb.saturation;
    this.brightness = config.hsb.brightness;
    this.api = new HueApi(host, user);
    this.state = lightState.create();
}


Light.prototype = {
    
    sendCommand: function () {
        this.api.setLightState(this.lightid, this.state, function(error, l) {
            if (error) throw error;
        }
    }
}
