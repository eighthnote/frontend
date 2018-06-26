import React, { Component } from 'react';
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
    const { logout } = this.props;
    //deleted name from const, replaced in nav with profile

    return (
      <header className={styles.header}>
        <h1>Together</h1>
        <ul className="nav">
          <NavLink to="/feed">Feed</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/friends">Friends</NavLink>
          <NavLink to="/plans">Plans</NavLink>
          <NavLink to="/auth" onClick={logout}>Log Out</NavLink>
        </ul>
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