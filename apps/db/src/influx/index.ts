import {InfluxDB, FieldType} from 'influx';
import {environment} from '../environments/environment';
import {DB_NAME, Field, Tag} from '../constants';
import {Variables} from '@monorepo/core';

const {influxHost, influxPort, influxUser, influxPassword} = environment;

const influx = new InfluxDB({
  host: influxHost,
  port: influxPort,
  username: influxUser,
  password: influxPassword,
  database: DB_NAME,
  schema: [
    {
      measurement: Field.temperature,
      fields: {
        studio: FieldType.FLOAT,
        bathroom: FieldType.FLOAT,
        kidsroom: FieldType.FLOAT,
        bedroom: FieldType.FLOAT,
      },
      tags: [Tag.heating],
    },
    {
      measurement: Field.variables,
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

export function logOutdoorTemp(temp: number) {
  influx
    .writePoints([
      {
        measurement: Field.temperature,
        fields: {temp},
      },
    ])
    .catch(err => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`);
    });
}

export function logVariables(fields: Partial<Variables>) {
  influx
    .writePoints([
      {
        measurement: Field.variables,
        fields,
      },
    ])
    .catch(err => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`);
    });
}

export function querryVariables(limit?: number) {
  return influx.query(
    `select * from ${Field.variables}
    order by time desc
    ${limit ? `limit ${limit}` : ''}`,
  );
}
