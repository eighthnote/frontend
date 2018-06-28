import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccount } from '../auth/reducers';
import { signin, signup } from './actions';
import Credentials from './Credentials';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Auth extends PureComponent {
  static propTypes = {
    account: PropTypes.object,
    signin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    location: PropTypes.object
  };

  render() {
    const { account, signin, signup, location } = this.props;
    
    const redirect = location.state ? location.state.from : '/';

    if(account) return <Redirect to={redirect}/>;

    return (
      <section className="tabs">
        <Tabs>
          <TabList>
            <Tab>Sign In</Tab>
            <Tab><Link to="/auth/signup">Sign Up</Link></Tab>
          </TabList>
          <Switch>
            <Route path='/auth/signin' render={() => (
              <TabPanel>
                <Credentials action="SIGN IN" submitCredentials={signin}/>
                <p>No account? <Link to="/auth/signup">Sign up instead.</Link></p>
              </TabPanel>
            )}/>
            <Route path="/auth/signup" render={() => (
              <TabPanel>
                <Credentials action="SIGN UP" submitCredentials={signup} includeName={true}/>
              </TabPanel>
            )}/>
            <Redirect to="/auth/signin"/>
          </Switch>
        </Tabs>
      </section>
    );
  }
}

export default connect(
  state => ({ account: getAccount(state) }),
  { signin, signup }
)(Auth);