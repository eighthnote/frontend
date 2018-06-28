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
import { attemptAccountLoad } from '../auth/actions';
import { loadUserProfile, loadFriendProfile } from '../profile/actions';

class App extends PureComponent {
  static propTypes = {
    attemptAccountLoad: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired,
    loadUserProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.attemptAccountLoad();
  }

  render() {
    const { checkedAuth, loadUserProfile } = this.props;

    return (
      <Router>
        <div>
          <Route component={Header}/>
          <main>
            {checkedAuth &&
            <Switch>
              <Route path="/auth" component={Auth}/>
              <PrivateRoute path="/profile" render={() => <Profile loadFunction={loadUserProfile} isUser={true}/>}/>
              <PrivateRoute path="/feed" component={Feed}/>
              <PrivateRoute path="/friends" component={Friends}/>
              <PrivateRoute path="/friends/:id" render={({ match }) => {
                return <Profile loadFunction={() => loadFriendProfile(match.params.id)}/>;
              }}/>
              <PrivateRoute path="/plans" component={Plans}/>
              <Redirect to="/profile"/>
            </Switch>
            }
          </main>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    checkedAuth: getCheckedAuth(state),
  }),
  { attemptAccountLoad, loadUserProfile, loadFriendProfile }
)(App);