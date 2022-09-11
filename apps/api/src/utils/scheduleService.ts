import {mqttService} from '@monorepo/mqtt';
import {RequestSetTopic, RoomNames} from '@monorepo/core';
import {getState, removeAwayUntil, setAwayUntil} from '@monorepo/store';

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

export function setAwayMode(until: string | null) {
  if (until === null) {
    removeAwayUntil();
  } else {
    const awayTemp = setAwayUntil(until);
    if (awayTemp) ROOMS.forEach(room => queueShift(room, awayTemp));
  }
}

export function handleAwayUntilDone() {
  const {away} = getState();
  if (new Date(away.until).getTime() - Date.now() <= DAY) {
    ROOMS.forEach(room => queueShift(room, away.restoreTo[room]));
    removeAwayUntil();
  } else {
    setTimeout(handleAwayUntilDone, DAY / 2);
  }
}
