var light = require('./light.js');
var nodeSchedule = require('node-schedule');

var log;
var name;
var cron;
var lights;
var task;

function Schedule(homebridgeLog, config) {
    this.log = homebridgeLog;
    this.name = config.name;
    this.cron = config.cron;
    for each element in config.lights {
        var l = new light(homebridgeLog, element);
        this.lights.push(l);
    }
    this.task = nodeSchedule.scheduleJob(cron, execute());
}

function execute () {
    
    
}

Schedule.prototype = {


}
