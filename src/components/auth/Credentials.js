import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Credentials extends PureComponent {
  static propTypes = {
    submitCredentials: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    includeName: PropTypes.bool
  };

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitCredentials(this.state);
  };

  render() {
    const { action = false } = this.props;
    const { firstName, lastName, email, password } = this.state;

    return (
      <body className="tabs" onSubmit={this.handleSubmit}>
        <Tabs>
          <TabList>
            <Tab><Link to="/auth/signin">Sign In</Link></Tab>
            <Tab><Link to="/auth/signup">Sign Up</Link></Tab>
          </TabList>
          <TabPanel>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={firstName} onChange={this.handleChange}/>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={lastName} onChange={this.handleChange}/>
          </TabPanel>
          <TabPanel>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={email} onChange={this.handleChange}/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={this.handleChange}/>

            <button type="submit">{action}</button>
          </TabPanel>
        </Tabs>
      </body>
    );
  }
}