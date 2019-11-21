import React, {Dispatch} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {getRatio} from '../utility/screen';
import history from '../history';
import MainApp from './main';
import {ratioChange} from '../store/actions/web';

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
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={MainApp} />
            {/* <Route path="/settings" component={StreamCreate} /> */}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  (dispatch: Dispatch<any>) => ({
    dispatchRatio: (ratio: number) => dispatch(ratioChange(ratio)),
  }),
)(App);
