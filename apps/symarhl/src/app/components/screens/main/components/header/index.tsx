import React from 'react';
import {PowerValue} from '@monorepo/core';
import {AppBar, Toolbar} from '@material-ui/core';
import PumpIcon from '../../../../common/icons/PumpIcon';
import {isOn} from 'apps/symarhl/src/app/utility/power';
import styles from '../../../../common/icons/styles';
import Temperature from '../../../../common/temperature';
import SunThermometer from '../../../../common/icons/SunThermometer';

interface Props {
  pumpPower: PowerValue;
  outdoorTemp: number;
}

class Header extends React.PureComponent<Props> {
  // getWeaterIcon() {
  //   const {outdoorTemp} = this.props;
  //   return outdoorTemp > 16 ? Error : outdoorTemp > 2 ? Error : Error;
  // }

  getWeaterIconColor(): string {
    const {outdoorTemp} = this.props;
    return outdoorTemp < 2 ? '#0098FF' : outdoorTemp < 16 ? '#CCC' : "#cc7722" ;
  }

  render() {
    const {pumpPower, outdoorTemp} = this.props;
    // const WeaterIcon = this.getWeaterIcon();
    return (
      <AppBar position="static" color="default" style={{marginBottom: '20px'}}>
        <Toolbar style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#2C2C32'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <SunThermometer htmlColor={this.getWeaterIconColor()} style={{marginLeft: '16px', marginRight: '16px'}}/>
            <Temperature val={outdoorTemp} />
          </div>
          <PumpIcon
            fontSize="small"
            style={isOn(pumpPower) ? styles.enabled : styles.disabled}
          />
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
