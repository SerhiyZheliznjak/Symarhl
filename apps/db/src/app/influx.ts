import {InfluxDB, FieldType} from 'influx';
import {environment} from '../environments/environment';

const {influxHost, influxPort, influxUser, influxPassword} = environment;

const influx = new InfluxDB({
  host: influxHost,
  port: influxPort,
  username: influxUser,
  password: influxPassword,
  database: 'symarhl',
  schema: [
    {
      measurement: 'temperature',
      fields: {
        studio: FieldType.FLOAT,
        bathroom: FieldType.FLOAT,
        kidsroom: FieldType.FLOAT,
        bedroom: FieldType.FLOAT,
      },
      tags: ['heating'],
    },
    {
      measurement: 'variables',
      fields: {
        studio: FieldType.FLOAT,
        bathroom: FieldType.FLOAT,
        kidsroom: FieldType.FLOAT,
        bedroom: FieldType.FLOAT,
        interval: FieldType.INTEGER,
        hysteresis: FieldType.FLOAT,
      },
      tags: [],
    },
  ],
});

export default influx;
