import React from 'react';
import {Container, Grid, Typography} from '@material-ui/core';
import FloorIcon from './FloorIcon';
import HeatingTool from './HeatingTool';
import Leaf from './Leaf';
import Night from './Night';
import PumpIcon from './PumpIcon';
import Snowflake from './Snowflake';
import {SvgIconProps} from '@material-ui/core/SvgIcon';

class IconsDemo extends React.PureComponent {
  render() {
    const icons: React.FC<SvgIconProps>[] = [
      FloorIcon,
      HeatingTool,
      Leaf,
      Night,
      PumpIcon,
      Snowflake,
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
