import React from 'react';
import {Grid, Paper, Typography, Box} from '@material-ui/core';
import Ticker from '../ticker';
import FloorIcon from '../../icons/FloorIcon';
import {PowerValue} from '@monorepo/core';
import {isOn} from '../../utility/power';
import ErrorIcon from '@material-ui/icons/Error';
import capitalize from 'lodash/capitalize';

interface Props {
  name: string;
  temp: number;
  minTemp: number;
  isLandscape: boolean;
  power: PowerValue;
}

class Room extends React.PureComponent<Props> {
  renderTemp(val: number) {
    if (val === -127) {
      return <ErrorIcon color="error" />;
    }

    const roundedVal = Math.round(val * 10) / 10;
    return (
      <Typography variant="h5" component="h3">
        {`${roundedVal}° C`}
      </Typography>
    );
  }

  render() {
    const {name, isLandscape, temp, minTemp, power} = this.props;
    return (
      <Grid item xs={isLandscape ? 4 : 6} style={{height: '200px'}}>
        <Paper style={{height: '100%'}}>
          <Grid
            container
            direction="row"
            justify="center"
            style={{height: '100%'}}
          >
            <Grid item xs={12}>
              <Typography variant="h5" component="h3" align="center">
                {capitalize(name)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="center"
                style={{height: '100%'}}
              >
                <Grid item xs={6}>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    style={{height: '100%'}}
                  >
                    <Grid item>{this.renderTemp(temp)}</Grid>
                    <Grid item>
                      <FloorIcon color={isOn(power) ? 'error' : 'disabled'} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Ticker room={name} minTemp={minTemp} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default Room;
