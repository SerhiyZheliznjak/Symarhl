import React, {Dispatch} from 'react';
import {Grid, Button, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import {RoomNames} from '@monorepo/core';
import Plus from '../icons/Plus';
import Minus from '../icons/Minus';
import {putMinTemp} from '../../../store';
import {StoreType} from 'apps/symarhl/src/main';

interface Props {
  room: string;
  minTemp: number;
  isAway: boolean;
  doSetMinTemp: (room: string, temp: number) => void;
}

class Ticker extends React.PureComponent<Props> {
  state = {
    temp: +this.props.minTemp,
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.minTemp !== nextProps.minTemp)
      this.setState({temp: nextProps.minTemp});
  }

  tickTemp(shift: number) {
    const {room, doSetMinTemp} = this.props;
    const {temp} = this.state;
    const ticked = temp + shift;
    this.setState({temp: ticked});

    doSetMinTemp(room, ticked);
  }

  onTempUp = () => {
    this.tickTemp(0.5);
  };
  onTempDown = () => {
    this.tickTemp(-0.5);
  };

  render() {
    const {temp} = this.state;
    const {isAway} = this.props;
    return (
      <Grid
        direction="column"
        container
        justify="space-around"
        style={{height: '100%'}}
        alignItems="center"
      >
        <Grid item>
          <Button
            onClick={this.onTempUp}
            color="secondary"
            variant="outlined"
            disabled={isAway}
          >
            <Plus />
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="p">
            {isNaN(temp) ? '' : temp}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={this.onTempDown}
            color="primary"
            variant="outlined"
            disabled={isAway}
          >
            <Minus />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  ({home}: StoreType) => ({
    isAway: !!home.away,
  }),
  (dispatch: Dispatch<any>) => ({
    doSetMinTemp: debounce((room: RoomNames, temp: number) => {
      dispatch(putMinTemp({room, temp}));
    }, 500),
  }),
)(Ticker);
