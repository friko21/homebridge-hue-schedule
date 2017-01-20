var light = require('./light.js');

var log;
var name;
var cron;
var lights;

function Schedule(homebridgeLog, config) {
    this.log = homebridgeLog;
    this.name = config.name;
    this.cron = config.cron;
    for each element in config.lights {
        var l = new light
        
        
    }

}


Schedule.prototype = {


}
