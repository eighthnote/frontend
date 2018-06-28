import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccount } from '../auth/reducers';
import { signin, signup } from './actions';
import Credentials from './Credentials';

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
      <section>
        <li><Link to="/auth/signin">Sign In</Link></li>
        <li><Link to="/auth/signup">Sign Up</Link></li>
        <Switch>
          <Route path='/auth/signin' render={() => (
            <div>
              <Credentials action="SIGN IN" submitCredentials={signin}/>
              <p>No account? <Link to="/auth/signup">Sign up instead.</Link></p>
            </div>
          )}/>
          <Route path="/auth/signup" render={() => (
            <div>
              <Credentials action="SIGN UP" submitCredentials={signup} includeName={true}/>
            </div>
          )}/>
          <Redirect to="/auth/signin"/>
        </Switch>
      </section>
    );
  }
}

export default connect(
  state => ({ account: getAccount(state) }),
  { signin, signup }
)(Auth);