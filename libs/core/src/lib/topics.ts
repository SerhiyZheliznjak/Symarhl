export enum ReadTopic {
  studio = 'temp/studio',
  bathroom = 'temp/bathroom',
  kidsroom = 'temp/kidsroom',
  bedroom = 'temp/bedroom',
  outdoor = 'temp/outdoor',
  water = 'temp/water',
  power = 'power',
  variables = 'variables',
  started = 'started',
}

export enum RequestSetTopic {
  hysteresis = 'set/hysteresis',
  interval = 'set/interval',
  studio = 'set/studio',
  bathroom = 'set/bathroom',
  kidsroom = 'set/kidsroom',
  bedroom = 'set/bedroom',
  confirmed = 'set/confirmation',
}

export type Topic = ReadTopic | RequestSetTopic;
