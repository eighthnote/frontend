import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserName } from '../auth/reducers';
import { logout } from '../auth/actions';
import styles from './Header.css';

class Header extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { name, logout } = this.props;

    return (
      <header className={styles.header}>
        <h1>Together</h1>
        <nav>
          <ul>
            {name ?
              <Fragment>
                <li><NavLink to="/feed">Feed</NavLink></li>
                <li><NavLink to="/profile">{name}</NavLink></li>
                <li><NavLink to="friends">Friends</NavLink></li>
                <li><NavLink to="/plans">Plans</NavLink></li>
                <li><NavLink to="/auth" onClick={logout}>Log Out</NavLink></li>
              </Fragment>
              : <Fragment>
                <li><NavLink to="/auth/signin">Sign In</NavLink></li>
                <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
              </Fragment>}
          </ul>
        </nav>
      </header>
    );
  }
}

export default connect(
  state => ({
    name: getUserName(state)
  }),
  { logout }
)(Header);