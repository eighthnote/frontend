import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getError } from '../app/reducers';
import { getAccount } from '../auth/reducers';
import { signin, signup } from './actions';
import Credentials from './Credentials';
import styles from './Auth.css';

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
      <section className={styles.auth}>
        <ul className="auth-nav">
          <li><NavLink activeClassName="signin" className="auth-link" to="/auth/signin">Sign In</NavLink></li>
          <li><NavLink activeClassName="signup" className="auth-link" to="/auth/signup">Sign Up</NavLink></li>
        </ul>
        <Switch>
          <Route path='/auth/signin' render={() => (
            <div className="auth-form signin">
              <Credentials action="SIGN IN" submitCredentials={signin}/>
            </div>
          )}/>
          <Route path="/auth/signup" render={() => (
            <div className="auth-form signup">
              <Credentials action="SIGN UP" submitCredentials={signup} includeName={true}/>
              {!!error && <p>{error.error}</p>}
            </div>
          )}/>
          <Redirect to="/auth/signin"/>
        </Switch>
      </section>
    );
  }
}

export default connect(
  state => ({
    account: getAccount(state),
    error: getError(state)
  }),
  { signin, signup }
)(Auth);