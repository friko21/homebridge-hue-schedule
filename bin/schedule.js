var light = require('./light.js');
var nodeSchedule = require('node-schedule');

var log;
var name;
var cron;
var lights;
var task;
var active;

function Schedule(homebridgeLog, config) {
    this.log = homebridgeLog;
    this.name = config.name;
    this.cron = config.cron;
    config.lights.forEach( function(element) {
        var l = new light(homebridgeLog, element);
        this.lights.push(l);
    });
    this.task = nodeSchedule.scheduleJob(cron, execute());
    this.activ = true;
}

function execute () {
    this.lights.gorEach( function(l) {
        l.sendCommand();
    });
    this.task.cancel();
    this.activ = false;
}

Schedule.prototype = {

    setOn: function () {
        nodeSchedule.rescheduleJob(this.task, this.cron);
    }
    
    setOff: function () {
        this.task.cancel();
    }

    getState: function () {
        return activ;
    }

}
