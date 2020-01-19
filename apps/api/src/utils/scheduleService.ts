import {mqttService} from '@monorepo/mqtt';
import {RequestSetTopic, RoomNames} from '@monorepo/core';
import {getState} from '@monorepo/store';
import {isNull} from 'util';
import {scheduleJob} from 'node-schedule';

const AWAY_TEMP = 10;
const ROOMS: RoomNames[] = ['studio', 'bathroom', 'kidsroom', 'bedroom'];
const DAY = 24 * 60 * 60 * 1000;

function queueShift(topic: RoomNames, temp: number) {
  setTimeout(
    () =>
      mqttService.setVariableValue(
        `set/${topic}` as RequestSetTopic,
        String(temp),
      ),
    500,
  );
}

function setAwayTemp() {
  ROOMS.forEach(room => queueShift(room, AWAY_TEMP));
}

export function setAwayMode(from: Date | null, to: Date) {
  const {studio, bathroom, kidsroom, bedroom} = getState().variables;
  const startHeatingTime = to.getTime() - DAY / 2;
  if (isNull(from)) setAwayTemp();
  else {
    if (startHeatingTime - from.getTime() > DAY / 2)
      scheduleJob(from, setAwayTemp);
    else return;
  }

  const startHeatingDate = new Date();
  startHeatingDate.setDate(to.getDate() - 1);
  scheduleJob(to, () => {
    queueShift('studio', studio);
    queueShift('bathroom', bathroom);
    queueShift('kidsroom', kidsroom);
    queueShift('bedroom', bedroom);
  });
}
