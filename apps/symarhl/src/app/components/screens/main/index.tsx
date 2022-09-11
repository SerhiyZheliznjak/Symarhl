import React, {Dispatch} from 'react';

import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

import Room from './components/room';
import {connect} from 'react-redux';

import {
  TempReadings,
  Variables,
  Power,
  PowerValue,
  RoomTemp,
  HomeState,
} from '@monorepo/core';

import Header from './components/header';
import {TextFieldProps} from '@material-ui/core/TextField';
import dayjs from 'dayjs';
import heatingService from '../../../api/heatingService';
import {StoreType} from 'apps/symarhl/src/main';
import {fetchHomeState} from '../../../store';

interface Props {
  temp: TempReadings;
  power: Power;
  variables: Variables;
  away: HomeState['away'];
  fetchHomeState: () => void;
}

class ARoom {
  constructor(
    public name: string,
    public temp: number,
    public minTemp: number,
    public power: PowerValue,
  ) {}
}

type State = {awayFor: number; arrivalDate: null | string};

class MainScreen extends React.PureComponent<Props, State> {
  private interval: NodeJS.Timeout;

  state: State = {
    awayFor: 3,
    arrivalDate: null,
  };

  onChangeAwayFor: TextFieldProps['onChange'] = ({target}) => {
    this.setState({awayFor: +target.value});
  };

  onSubmitAway = () => {
    if (this.state.arrivalDate) {
      this.setState({arrivalDate: null});
      heatingService.delete('/schedule/away');
    } else {
      const awayUntil = dayjs().add(this.state.awayFor, 'days');
      this.setState({arrivalDate: awayUntil.format('DD MM YY')});
      heatingService.put('/schedule/away', {until: awayUntil.toISOString()});
    }
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.away !== nextProps.away)
      this.setState({
        arrivalDate: nextProps.away
          ? dayjs(nextProps.away.until).format('DD MM YY')
          : null,
      });
  }

  fetchData = () => {
    const {fetchHomeState} = this.props;
    fetchHomeState();
  };

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {temp, power, variables} = this.props;
    const rooms: ARoom[] = Array.from(Object.entries(temp))
      .filter(([name]) => name in RoomTemp)
      .map(
        ([name, temp]: [RoomTemp, number]) =>
          new ARoom(name, temp, variables[name], power[name]),
      );
    return (
      <React.Fragment>
        <Header pumpPower={power.pump} outdoorTemp={temp.outdoor} />
        <Container maxWidth="lg">
          <Grid container justify="flex-start" spacing={2}>
            {rooms.map(({name, temp, minTemp, power}) => (
              <Room
                key={name}
                name={name}
                isLandscape={false}
                temp={temp}
                power={power}
                minTemp={minTemp}
              />
            ))}
          </Grid>
          <div
            style={{display: 'flex', padding: '20px', justifyContent: 'center'}}
          >
            {!!this.state.arrivalDate ? (
              <Typography
                variant="h5"
                component="h3"
                align="center"
                style={{color: '#CCC'}}
              >
                Тепло буде з {this.state.arrivalDate}
              </Typography>
            ) : (
              <TextField
                label="Днів не гріти:"
                type="number"
                value={this.state.awayFor}
                onChange={this.onChangeAwayFor}
              />
            )}

            <Button
              variant="contained"
              onClick={this.onSubmitAway}
              style={{margin: '0px 20px'}}
            >
              {!!this.state.arrivalDate ? 'Гріти ВЖЕ!' : 'Ok'}
            </Button>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  ({home}: StoreType) => ({
    ...home,
  }),
  (dispatch: Dispatch<any>) => ({
    fetchHomeState: () => dispatch(fetchHomeState()),
  }),
)(MainScreen);
