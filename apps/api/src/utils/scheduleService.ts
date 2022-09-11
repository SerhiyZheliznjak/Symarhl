import {mqttService} from '@monorepo/mqtt';
import {RequestSetTopic, RoomNames} from '@monorepo/core';
import {
  AWAY_TEMP,
  getState,
  removeAwayUntil,
  setAwayUntil,
} from '@monorepo/store';

const ROOMS: RoomNames[] = ['studio', 'bathroom', 'kidsroom', 'bedroom'];
const DAY = 24 * 60 * 60 * 1000;

function setRoomTemp(room: RoomNames, temp: number) {
  return mqttService.setVariableValue(
    `set/${room}` as RequestSetTopic,
    String(temp),
  );
}

export async function setAwayMode(until: string, skipVarUpdate?: boolean) {
  if (!skipVarUpdate) setAwayUntil(until);

  await setRoomTemp('studio', AWAY_TEMP);
  await setRoomTemp('bathroom', AWAY_TEMP);
  await setRoomTemp('kidsroom', AWAY_TEMP);
  await setRoomTemp('bedroom', AWAY_TEMP);

  checkAwayUntilDone();
}

function checkAwayUntilDone() {
  const {away} = getState();

  if (new Date(away.until).getTime() - Date.now() <= DAY) {
    restoreVars().then(() => {});
  } else {
    setTimeout(checkAwayUntilDone, DAY / 4);
  }
}

export async function restoreVars() {
  const {away} = getState();

  await setRoomTemp('studio', away.restoreTo.studio);
  await setRoomTemp('bathroom', away.restoreTo.bathroom);
  await setRoomTemp('kidsroom', away.restoreTo.kidsroom);
  await setRoomTemp('bedroom', away.restoreTo.bedroom);

  removeAwayUntil();
}
