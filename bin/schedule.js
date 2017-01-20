var light = require('./light.js');
var nodeSchedule = require('node-schedule');

var log;
var name;
var cron;
var lights;
var task;
var active;

function Schedule(homebridgeLog, config, host, user) {
    this.log = homebridgeLog;
    this.name = config.name;
    this.cron = config.cron;
    config.lights.forEach( function(element) {
        var l = new light(homebridgeLog, element, host, user);
        this.lights.push(l);
    });
    this.task = nodeSchedule.scheduleJob(cron, execute());
    this.active = true;
}

function execute () {
    this.lights.forEach( function(l) {
        l.sendCommand();
    });
    this.task.cancel();
    this.active = false;
}

Schedule.prototype = {

    setOn: function () {
        nodeSchedule.rescheduleJob(this.task, this.cron);
        this.active = true;
    },
    
    setOff: function () {
        this.task.cancel();
        this.active = false;
    },

    getState: function () {
        return this.active;
    }

}
