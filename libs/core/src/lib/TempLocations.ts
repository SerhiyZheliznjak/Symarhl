export enum RoomTemp {
  studio = 'studio',
  bathroom = 'bathroom',
  kidsroom = 'kidsroom',
  bedroom = 'bedroom',
}

export enum UtilityTemp {
  outdoor = 'outdoor',
  water = 'water',
}

export type TempLocation = keyof typeof RoomTemp | keyof typeof UtilityTemp;
