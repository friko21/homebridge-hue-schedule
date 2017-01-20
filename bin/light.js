var nodeHueApi = require('node-hue-api'),
    HueApi = nodeHueApi.HueApi,
    lightState = nodeHueApi.lightState;

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
    this.hue = config.hue;
    this.saturation = config.saturation;
    this.brightness = config.brightness;
    this.api = new HueApi(host, user);
    buildState();
}

function buildState () {
    this.state = lightState.create();
    switch(this.action) {
        case 'on':
            this.state.turnOn();
            break;
        case 'off':
            this.state.turnOff();
            break;
        default:
            break;
    }
    this.state.hsb(this.hue, this.saturation, this.brightness);
    if (this.transitionTime) {
        this.state.transitionTime(this.transitionTime);
    }
    
}

Light.prototype = {
    
    sendCommand: function () {
        this.api.setLightState(this.lightid, this.state, function(error, l) {
            if (error) throw error;
        }
    }
}
