import React, { Component } from 'react';
import {  Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserName } from '../auth/reducers';
import { logout } from '../auth/actions';
import styles from './Header.css';
import { Tab, Tabs, TabList } from 'react-tabs';

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
        <ul className="nav">
          <NavLink to="/feed">Feed</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/friends">Friends</NavLink>
          <NavLink to="/plans">Plans</NavLink>
          <NavLink to="/auth" onClick={logout}>Log Out</NavLink>
        </ul>
        <main>
          <div className="tabs">
            <Tabs>
              <TabList>
                <Tab><Link to="/auth/signin">Sign In</Link></Tab>
                <Tab><Link to="/auth/signup">Sign Up</Link></Tab>
              </TabList>
              {/* <TabPanel>
              <h2>Content</h2>
              </TabPanel>
              <TabPanel>
              <h2>Content</h2>
            </TabPanel> */}
            </Tabs>
          </div>
        </main>
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