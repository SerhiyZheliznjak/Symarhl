import axios from 'axios';
// import { initialState } from '../store/constants';

export default axios.create({
  baseURL: 'http://192.168.88.243:3000',
});

// export default ({
//   put: (s: string, data: any) => Promise.resolve(),
//   delete: (s: string) => Promise.resolve(),
//   get: (s:string) => Promise.resolve({data: {...initialState, temp: {
//     studio: Math.random(),
//     bathroom: Math.random(),
//     bedroom: Math.random(),
//     kidsroom: Math.random(),
//     outdoor: Math.random(),
//     water: Math.random(),
//   },
//   variables: {
//     studio: Math.random(),
//     bathroom: Math.random(),
//     kidsroom: Math.random(),
//     bedroom: Math.random(),
//     interval: Math.random(),
//     hysteresis: Math.random(),
//   },}})
// })
