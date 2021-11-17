import React, {Dispatch} from 'react';
import {Grid, Button, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import {setMinTemp} from '../../../store/actions/common';
import {NO_READINGS} from '@monorepo/core';
import Plus from '../icons/Plus';
import Minus from '../icons/Minus';

interface Props {
  room: string;
  minTemp: number;
  doSetMinTemp: (room: string, temp: number) => void;
}

class Ticker extends React.PureComponent<Props> {
  state = {
    temp: +this.props.minTemp,
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.minTemp === NO_READINGS && nextProps.minTemp !== NO_READINGS)
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
    return (
      <Grid
        direction="column"
        container
        justify="space-around"
        style={{height: '100%'}}
        alignItems="center"
      >
        <Grid item>
          <Button onClick={this.onTempUp} color="secondary" variant="outlined">
            <Plus />
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="p">
            {isNaN(temp) ? '' : temp}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={this.onTempDown} color="primary"  variant="outlined">
            <Minus />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  null,
  (dispatch: Dispatch<any>) => ({
    doSetMinTemp: debounce((room: string, temp: number) => {
      dispatch(setMinTemp(room, temp));
    }, 500),
  }),
)(Ticker);
