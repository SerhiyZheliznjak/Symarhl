import {PowerState} from '@monorepo/core';

export function isOn(val: PowerState): boolean {
  return val === '1';
}
