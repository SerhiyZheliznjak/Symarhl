import React from 'react';
import {PowerValue} from '@monorepo/core';
import {AppBar, Toolbar} from '@material-ui/core';
import PumpIcon from '../../../../common/icons/PumpIcon';
import {isOn} from 'apps/symarhl/src/app/utility/power';
import styles from '../../../../common/icons/styles';
import Temperature from '../../../../common/temperature';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
// import NightsStayIcon from '@material-ui/icons/NightsStay';

interface Props {
  pumpPower: PowerValue;
  outdoorTemp: number;
}

class Header extends React.PureComponent<Props> {
  getWeaterIcon() {
    const {outdoorTemp} = this.props;
    return outdoorTemp > 16
      ? WbSunnyIcon
      : outdoorTemp > 2
      ? WbCloudyIcon
      : AcUnitIcon;
  }

  render() {
    const {pumpPower, outdoorTemp} = this.props;
    const WeaterIcon = this.getWeaterIcon();
    return (
      <AppBar position="static" color="default" style={{marginBottom: '20px'}}>
        <Toolbar>
          <PumpIcon
            fontSize="small"
            style={isOn(pumpPower) ? styles.enabled : styles.disabled}
          />
          <WeaterIcon />
          <Temperature val={outdoorTemp} />
          {/* <NightsStayIcon
              style={
                variables.nightShift > 0 ? styles.enabled : styles.disabled
              }
            /> */}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
