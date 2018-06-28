import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Auth from '../auth/Auth';
import Profile from '../profile/Profile';
import Feed from '../feed/Feed';
import Friends from '../friends/Friends';
import About from '../about/About';
import PrivateRoute from './PrivateRoute';
import { getCheckedAuth } from '../auth/reducers';
import { attemptAccountLoad } from '../auth/actions';

class App extends PureComponent {
  static propTypes = {
    attemptAccountLoad: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.attemptAccountLoad();
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
              <PrivateRoute path="/profile" render={({ location }) => <Profile location={location} isUser={true}/>}/>
              <PrivateRoute path="/feed" component={Feed}/>
              <PrivateRoute exact path="/friends"  component={Friends}/>
              <PrivateRoute path="/friends/:id" component={Profile}/>
              <Route path="/about" component={About}/>
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
  { attemptAccountLoad }
)(App);