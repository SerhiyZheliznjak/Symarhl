const {scheduleJob} = require('node-schedule');
import {RequestSetTopic, Room} from '@monorepo/core';
import {mqttService} from '@monorepo/mqtt';
import {getState, setNightTemp, delNightTemp} from '@monorepo/store';

let morningJob;
let eveningJob;

function getTomorrow(today: Date): Date {
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
}

function queueShift(topic: RequestSetTopic, temp: string) {
  setTimeout(() => mqttService.setVariableValue(topic, temp), 500);
}

function setDayShift() {
  const {variables, nightShift} = getState();
  Array.from(nightShift.at.entries()).forEach(([room]) => {
    queueShift(RequestSetTopic[room], String(variables[room]));
  });
}

function setNightShift() {
  const {nightShift} = getState();
  Array.from(nightShift.at.entries()).forEach(([room, nightTemp]) => {
    queueShift(RequestSetTopic[room], String(nightTemp));
  });
}

function scheduleDayShift(tomorrow: Date) {
  const date = new Date(tomorrow.getTime());
  const {morning} = getState().nightShift;
  date.setHours(morning, 0, 0);
  morningJob = scheduleJob(date, () => {
    setDayShift();
    scheduleNightShift(date);
  });
}

function scheduleNightShift(today: Date) {
  const date = new Date(today.getTime());
  const {evening} = getState().nightShift;
  date.setHours(evening, 0, 0);

  eveningJob = scheduleJob(date, () => {
    setNightShift();
    scheduleDayShift(getTomorrow(date));
  });
}

export function startScheduler(room: Room, nigthTemp: number) {
  const now = new Date();
  const {nightShift, variables} = getState();
  const {evening, morning} = nightShift;
  setNightTemp(room, nigthTemp);
  if (now.getHours() < morning) {
    if (!morningJob) scheduleDayShift(now);
    mqttService.setVariableValue(RequestSetTopic[room], String(nigthTemp));
  } else if (now.getHours() < evening) {
    if (!eveningJob) scheduleNightShift(now);
    mqttService.setVariableValue(
      RequestSetTopic[room],
      String(variables[room]),
    );
  } else {
    if (!morningJob) scheduleDayShift(getTomorrow(now));
    mqttService.setVariableValue(RequestSetTopic[room], String(nigthTemp));
  }
}

export function stopScheduler(room: Room) {
  if (delNightTemp(room) < 1) {
    if (morningJob) {
      morningJob.cancel();
      morningJob = null;
    }
    if (eveningJob) {
      eveningJob.cancel();
      eveningJob = null;
    }
  }
}
