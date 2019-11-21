import React, {Dispatch} from 'react';
import {Grid, IconButton, Typography} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import {setMinTemp} from '../../store/actions/common';

interface Props {
  room: string;
  temperature: number;
  doSetMinTemp: (room: string, temp: number) => void;
}

class Temperature extends React.PureComponent<Props> {
  tickTemp(shift: number) {
    const {room, temperature, doSetMinTemp} = this.props;
    doSetMinTemp(room, +temperature + shift);
  }

  onTempUp = () => {
    this.tickTemp(0.5);
  };
  onTempDown = () => {
    this.tickTemp(-0.5);
  };

  render() {
    const {temperature} = this.props;
    return (
      <Grid direction="column" container item xs>
        <IconButton onClick={this.onTempUp}>
          <KeyboardArrowUpIcon />
        </IconButton>
        <Typography variant="h5" component="h3">
          {isNaN(temperature) ? '' : temperature}
        </Typography>
        <IconButton onClick={this.onTempDown}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Grid>
    );
  }
}

export default connect(
  null,
  (dispatch: Dispatch<any>) => ({
    doSetMinTemp: debounce(
      (room: string, temp: number) => dispatch(setMinTemp(room, temp)),
      500,
    ),
  }),
)(Temperature);
