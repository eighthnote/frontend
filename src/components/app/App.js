import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Auth from '../auth/Auth';
import Profile from '../profile/Profile';
import Feed from '../feed/Feed';
import Friends from '../friends/Friends';
import Plans from '../plans/Plans';
import PrivateRoute from './PrivateRoute';
import { getCheckedAuth } from '../auth/reducers';
import { attemptUserLoad } from '../auth/actions';

class App extends PureComponent {
  static propTypes = {
    attemptUserLoad: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.attemptUserLoad();
  }

  render() {
    const { checkedAuth } = this.props;

    return (
      <Router>
        <div>
          <Route component={Header}/>
          <main>
            {checkedAuth &&
            <Switch>
              <Route path="/auth" component={Auth}/>
              <PrivateRoute path="/feed" component={Feed}/>
              <PrivateRoute path="/profile" component={Profile}/>
              <PrivateRoute path="/friends" component={Friends}/>
              <PrivateRoute path="/plans" component={Plans}/>
              <Redirect to="feed"/>
            </Switch>
            }
          </main>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({ checkedAuth: getCheckedAuth(state) }),
  { attemptUserLoad }
)(App);