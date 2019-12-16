export const parsePayload = (payload: string) =>
  payload.split(';').map(keyVal => keyVal.split('='));
