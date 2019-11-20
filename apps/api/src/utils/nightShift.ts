const {getSunrise, getSunset} = require('sunrise-sunset-js');
const {scheduleJob} = require('node-schedule');
import {homeLocation} from '../../config.json';
import {RequestSetTopic} from '@monorepo/core';
import {mqttService} from '@monorepo/mqtt';

function getTomorrow(today: Date): Date {
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
}

function getHomeSunrise(date: Date): Date {
  const [lat, long] = homeLocation;
  return getSunrise(lat, long, date);
}

function getHomeSunset(date: Date): Date {
  const [lat, long] = homeLocation;
  return getSunset(lat, long, date);
}

function setDayShift() {
  mqttService.setVariableValue(RequestSetTopic.nightShift, '0.00');
}

function setNightShift() {
  mqttService.setVariableValue(RequestSetTopic.nightShift, '1.00');
}

function scheduleDayShift(today: Date) {
  const sunrise = getHomeSunrise(today);
  scheduleJob(sunrise, () => {
    setDayShift();
    scheduleNightShift(today);
  });
}

function scheduleNightShift(today: Date) {
  const tomorrow = getTomorrow(today);
  const todaySunset = getHomeSunset(today);

  scheduleJob(todaySunset, () => {
    setNightShift();
    scheduleDayShift(tomorrow);
  });
}

export function startScheduler() {
  const now = new Date();
  const sunrise = getHomeSunrise(now);
  const sunset = getHomeSunset(now);

  if (now < sunrise) {
    scheduleDayShift(now);
    setNightShift();
  } else if (now < sunset) {
    scheduleNightShift(now);
    setDayShift();
  } else {
    scheduleDayShift(getTomorrow(now));
    setNightShift();
  }
}
