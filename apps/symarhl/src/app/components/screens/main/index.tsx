import React, {Dispatch} from 'react';
import {Container, Grid} from '@material-ui/core';
import Room from './components/room';
import {connect} from 'react-redux';
import {StoreType} from '../../../store/reducers';
import {
  TempReadings,
  Variables,
  Power,
  PowerValue,
  RoomTemp,
} from '@monorepo/core';
import {getHomeState} from '../../../store/actions/common';
import Header from './components/header';

interface Props {
  isLandscape: boolean;
  temperature: TempReadings;
  power: Power;
  variables: Variables;
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

class MainScreen extends React.PureComponent<Props> {
  private interval: NodeJS.Timeout;

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
    const {isLandscape, temperature, power, variables} = this.props;
    const rooms: ARoom[] = Array.from(Object.entries(temperature))
      .filter(([name]) => name in RoomTemp)
      .map(
        ([name, temp]: [RoomTemp, number]) =>
          new ARoom(name, temp, variables[name], power[name]),
      );
    return (
      <React.Fragment>
        <Header pumpPower={power.pump} outdoorTemp={temperature.outdoor} />
        <Container maxWidth="lg">
          <Grid container justify="flex-start" spacing={2}>
            {rooms.map(({name, temp, minTemp, power}) => (
              <Room
                key={name}
                name={name}
                isLandscape={isLandscape}
                temp={temp}
                power={power}
                minTemp={minTemp}
              />
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  ({screen, temperature, power, variables}: StoreType) => ({
    isLandscape: screen.isLandscape,
    temperature,
    power,
    variables,
  }),
  (dispatch: Dispatch<any>) => ({
    fetchHomeState: () => dispatch(getHomeState()),
  }),
)(MainScreen);
