export enum ReadTopic {
  studio = 'temp/studio',
  bathroom = 'temp/bathroom',
  kidsroom = 'temp/kidsroom',
  bedroom = 'temp/bedroom',
  power = 'power',
  variables = 'variables',
}

export enum RequestGetTopic {
  variables = 'get/variables',
}

export enum RequestSetTopic {
  nightShift = 'set/nightShift',
  hysteresis = 'set/hysteresis',
  interval = 'set/interval',
  studio = 'set/studio',
  bathroom = 'set/bathroom',
  kidsroom = 'set/kidsroom',
  bedroom = 'set/bedroom',
  confirmed = 'set/confirmation',
}

export type Topic = ReadTopic | RequestSetTopic | RequestGetTopic;
