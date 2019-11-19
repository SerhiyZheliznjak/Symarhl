import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import Temperature from '../temperature';
import FloorIcon from '../../icons/FloorIcon';
import {HomeState} from '../../interfaces';
import {StoreType} from '../../reducers';
import {connect} from 'react-redux';
import {isOn} from '../../utility/power';
import ErrorIcon from '@material-ui/icons/Error';

interface Props {
  name: string;
  temp: string;
  minTemp: number;
  isLandscape: boolean;
  homeState: HomeState;
}

class Room extends React.PureComponent<Props> {
  renderTemp(val: string) {
    if (parseInt(val) === -127) {
      return <ErrorIcon color="error" />;
    }
    return (
      <Typography variant="h5" component="h3">
        {`${val}° C`}
      </Typography>
    );
  }

  render() {
    const {name, isLandscape, temp, minTemp, homeState} = this.props;
    const {power} = homeState;
    return (
      <Grid item xs={isLandscape ? 3 : 6}>
        <Paper>
          <Grid container direction="row">
            <Grid item xs={8}>
              <Grid container direction="row" justify="center" spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3">
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {this.renderTemp(temp)}
                </Grid>
                <Grid item xs={12}>
                  <FloorIcon
                    color={isOn((power as any)[name]) ? 'error' : 'disabled'}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Temperature room={name} temperature={minTemp} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default connect(({homeState}: StoreType) => ({homeState}))(Room);
