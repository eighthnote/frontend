import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccount } from '../auth/reducers';
import { logout } from '../auth/actions';
import styles from './Header.css';

class Header extends Component {
  static propTypes = {
    account: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { account, logout } = this.props;

    return (
      <header className={styles.header}>
        <Link to="/profile" className="logo">Shareable</Link>
        <nav>
          {account &&
          <ul>
            <Fragment>
              <li><NavLink className="navigation" activeClassName="current" to="/profile">{account.name}</NavLink></li>
              <li><NavLink className="navigation" activeClassName="current" to="/feed">Feed</NavLink></li>
              <li><NavLink className="navigation" activeClassName="current" to="/friends">Friends</NavLink></li>
              <li><NavLink className="navigation" activeClassName="current" to="/about">About</NavLink></li>
              <li><Link to="/auth" className="logout" onClick={logout}>Log Out</Link></li>
            </Fragment>
          </ul>}
        </nav>
      </header>
    );
  }
}

export default connect(
  state => ({
    account: getAccount(state)
  }),
  { logout }
)(Header);