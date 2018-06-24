import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, signup } from './actions';
import { getCurrentUser } from './reducers';
import Credentials from './Credentials';

class Auth extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    signin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    location: PropTypes.object
  };

  render() {
    const { user, signin, signup, location } = this.props;
    
    const redirect = location.state ? location.state.from : '/';

    if(user) return <Redirect to={redirect}/>;

    return (
      <section>
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
  state => ({ user: getCurrentUser(state) }),
  { signin, signup }
)(Auth);