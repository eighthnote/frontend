import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getError } from '../app/reducers';
import { clearError } from '../app/actions';
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
    error: PropTypes.object,
    clearError: PropTypes.func.isRequired
  };

  componentDidUpdate({ location }) {
    const locationPreUpdate = location.pathname;
    const locationPostUpdate = this.props.location.pathname;
    if(locationPreUpdate === locationPostUpdate) return;
    const { error, clearError } = this.props;
    if(error) clearError();
  }

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if(error) clearError();
  }

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
            <Fragment>
              <div className="auth-form signin">
                <Credentials action="SIGN IN" submitCredentials={signin}/>
              </div>
              <div className="auth-error">{!!error && <span>{error.error}</span>}</div>   
            </Fragment>
          )}/>
          <Route path="/auth/signup" render={() => (
            <Fragment>
              <div className="auth-form signup">
                <Credentials action="SIGN UP" submitCredentials={signup} includeName={true}/>
              
              </div>
              <div className="auth-error">{!!error && <span>{error.error}</span>}</div>
            </Fragment>
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
  { signin, signup, clearError }
)(Auth);