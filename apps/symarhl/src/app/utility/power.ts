import {PowerState} from '@symarhl/core';

export function isOn(val: PowerState): boolean {
  return val === '1';
}
