import React, { Component } from 'react';
import {  Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserName } from '../auth/reducers';
import { logout } from '../auth/actions';
import styles from './Header.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
        <div className="nav">
          <ul>
            <li><NavLink to="/feed">Feed</NavLink></li>
            <li><NavLink to="/profile">{name}</NavLink></li>
            <li><NavLink to="friends">Friends</NavLink></li>
            <li><NavLink to="/plans">Plans</NavLink></li>
            <li><NavLink to="/auth" onClick={logout}>Log Out</NavLink></li>
          </ul>
        </div>
        <Tabs className="tabs">
          <TabList>
            <Tab><Link to="/auth/signin">Sign In</Link></Tab>
            <Tab><Link to="/auth/signup">Sign Up</Link></Tab>
          </TabList>
          <TabPanel>
            <h2>Content</h2>
          </TabPanel>
          <TabPanel>
            <h2>Content</h2>
          </TabPanel>
        </Tabs>
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