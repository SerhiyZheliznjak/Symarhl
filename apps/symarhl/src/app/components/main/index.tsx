import React, {Dispatch} from 'react';
import {AppBar, Container, Grid, Toolbar} from '@material-ui/core';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import PumpIcon from '../../icons/PumpIcon';
import styles from '../../icons/styles';
import Room from '../room';
import {connect} from 'react-redux';
import {StoreType} from '../../store/reducers';
import {RoomTemp, Variables, Power, PowerValue} from '@monorepo/core';
import {isOn} from '../../utility/power';
import {getHomeState} from '../../store/actions/common';

interface Props {
  isLandscape: boolean;
  temperature: RoomTemp;
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

class MainApp extends React.PureComponent<Props> {
  private interval;

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
    const rooms: ARoom[] = Array.from(Object.entries(temperature)).map(
      ([name, temp]: [keyof RoomTemp, number]) =>
        new ARoom(name, temp, variables[name], power[name]),
    );
    return (
      <React.Fragment>
        <AppBar position="static" color="default">
          <Toolbar>
            <PumpIcon
              fontSize="small"
              style={isOn(power.pump) ? styles.enabled : styles.disabled}
            />
            <NightsStayIcon
              style={
                variables.nightShift > 0 ? styles.enabled : styles.disabled
              }
            />
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid container justify="space-around" spacing={2}>
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
)(MainApp);
