import React, {Dispatch} from 'react';
import {Container, Grid, AppBar, Toolbar} from '@material-ui/core';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import PumpIcon from '../../icons/PumpIcon';
import styles from '../../icons/styles';
import Room from '../room';
import {connect} from 'react-redux';
import {StoreType} from '../../reducers';
import {RoomsTemp, HomeState} from '../../interfaces';
import {getHomeTemperature, getHomeState} from '../../actions';
import {isOn} from '../../utility/power';

interface Props {
  isLandscape: boolean;
  temperature: RoomsTemp;
  homeState: HomeState;
  fetchTemp: () => void;
  fetchHomeState: () => void;
}

class ARoom {
  constructor(
    public name: string,
    public temp: string,
    public minTemp: number,
  ) {}
}

class MainApp extends React.PureComponent<Props> {
  private interval!: NodeJS.Timeout;

  fetchData = () => {
    const {fetchTemp, fetchHomeState} = this.props;
    fetchTemp();
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
    const {isLandscape, temperature, homeState} = this.props;
    const {variables, power} = homeState;
    const rooms: ARoom[] = Array.from(Object.entries(temperature)).map(
      ([name, temp]) =>
        new ARoom(name, temp, parseFloat((variables as any)[name])),
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
                parseInt(variables.nightShift) > 0
                  ? styles.enabled
                  : styles.disabled
              }
            />
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid container justify="space-around" spacing={2}>
            {rooms.map(({name, temp, minTemp}) => (
              <Room
                key={name}
                name={name}
                isLandscape={isLandscape}
                temp={temp}
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
  ({screen, temperature, homeState}: StoreType) => ({
    isLandscape: screen.isLandscape,
    temperature,
    homeState,
  }),
  (dispatch: Dispatch<any>) => ({
    fetchTemp: () => dispatch(getHomeTemperature()),
    fetchHomeState: () => dispatch(getHomeState()),
  }),
)(MainApp);
