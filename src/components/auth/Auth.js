import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getError } from '../app/reducers';
import { getAccount } from '../auth/reducers';
import { signin, signup } from './actions';
import Credentials from './Credentials';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

class Auth extends PureComponent {
  static propTypes = {
    account: PropTypes.object,
    signin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    location: PropTypes.object,
    error: PropTypes.any
  };

  render() {
    const { account, signin, signup, location, error } = this.props;
    
    const redirect = location.state ? location.state.from : '/';

    if(account) return <Redirect to={redirect}/>;

    return (
      <section className="tabs">
        <Tabs>
          <TabLink to="tab1">Sign In</TabLink>
          <TabLink to="tab2" default>Sign Up</TabLink>
          <TabContent for="tab1">
            <Credentials action="SIGN IN" submitCredentials={signin}/>
            <p>No account? Sign up instead.</p>
          </TabContent>
          <TabContent for="tab2">
            <Credentials action="SIGN UP" submitCredentials={signup} includeName={true}/>
            {!!error && <p>{error.error}</p>}
          </TabContent>
        </Tabs>
      </section>
    );
  }
}

export default connect(
  state => ({ account: getAccount(state), error: getError(state) }),
  { signin, signup }
)(Auth);