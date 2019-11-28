import React from 'react';
import {Container, Grid, Typography} from '@material-ui/core';
import Acorn from './Acorn';
import ErrorIcon from './Error';
import Fire from './Fire';
import FloorIcon from './FloorIcon';
import HeatingTool from './HeatingTool';
import Leaf from './Leaf';
import Moon from './Moon';
import Moon2 from './Moon2';
import Moon1 from './Moon1';
import Night from './Night';
import PumpIcon from './PumpIcon';
import Rain from './Rain';
import Sleeping from './Sleeping';
import Snowflake from './Snowflake';
import Snowflake1 from './Snowflake1';
import Sun from './Sun';
import {SvgIconProps} from '@material-ui/core/SvgIcon';

class IconsDemo extends React.PureComponent {
  render() {
    const icons: React.FC<SvgIconProps>[] = [
      Acorn,
      ErrorIcon,
      Fire,
      FloorIcon,
      HeatingTool,
      Leaf,
      Moon,
      Moon1,
      Moon2,
      Night,
      PumpIcon,
      Rain,
      Sleeping,
      Snowflake,
      Snowflake1,
      Sun,
    ];
    return (
      <Container maxWidth="lg" style={{paddingTop: '20px'}}>
        <Grid container spacing={3}>
          {icons.map((Icon: React.FC, i) => (
            <Grid key={i} item xs={2}>
              <Typography>{Icon.displayName}</Typography>
              <Icon color="disabled" />
            </Grid>
          ))}
          {icons.map((Icon: React.FC, i) => (
            <Grid key={i} item xs={2}>
              <Icon color="error" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default IconsDemo;
