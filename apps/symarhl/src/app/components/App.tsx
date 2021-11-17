import React, {Dispatch} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {getRatio} from '../utility/screen';
import history from '../history';
import MainScreen from './screens/main';
import {ratioChange} from '../store/actions/web';
import SettingsScreen from './screens/settings';
import IconsDemo from './common/icons';

interface Props {
  dispatchRatio: (ratio: number) => void;
}

class App extends React.PureComponent<Props> {
  updateRatio = () => {
    const {dispatchRatio} = this.props;
    dispatchRatio(getRatio());
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateRatio);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateRatio);
  }

  render() {
    return (
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={MainScreen} />
              <Route path="/settings" component={SettingsScreen} />
              <Route path="/icons" component={IconsDemo} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default connect(
  null,
  (dispatch: Dispatch<any>) => ({
    dispatchRatio: (ratio: number) => dispatch(ratioChange(ratio)),
  }),
)(App);
