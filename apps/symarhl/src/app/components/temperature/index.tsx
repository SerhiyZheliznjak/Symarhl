import React, {Dispatch} from 'react';
import {Grid, Button, Typography} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import {setMinTemp} from '../../store/actions/common';
import {NO_READINGS} from '@monorepo/core';

interface Props {
  room: string;
  minTemp: number;
  doSetMinTemp: (room: string, temp: number) => void;
}

class Temperature extends React.PureComponent<Props> {
  state = {
    temp: +this.props.minTemp,
  };

  componentWillUpdate(nextProps) {
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
        justify="center"
        style={{height: '100%', border: '1px solid red'}}
      >
        <Grid item>
          <Button onClick={this.onTempUp} color="secondary">
            <KeyboardArrowUpIcon />
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="p">
            {isNaN(temp) ? '' : temp}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={this.onTempDown} color="primary">
            <KeyboardArrowDownIcon />
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
)(Temperature);
