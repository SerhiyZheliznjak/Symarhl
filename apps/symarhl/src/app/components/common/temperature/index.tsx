import React from 'react';
import {Typography} from '@material-ui/core';
import ErrorIcon from '../icons/Error';

interface Props {
  val: number;
}

class Temperature extends React.PureComponent<Props> {
  render() {
    const {val} = this.props;
    if (val === -127) {
      return <ErrorIcon color="error" />;
    }

    const roundedVal = Math.round(val * 10) / 10;
    return (
      <Typography variant="h5" component="h3" style={{display: 'inline', color: '#CCC'}}>
        {`${roundedVal}°`}
      </Typography>
    );
  }
}

export default Temperature;
