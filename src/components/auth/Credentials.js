import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

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
    const { action, includeName = false } = this.props;
    const { firstName, lastName, email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {includeName &&
          <Fragment>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className="firstName" value={firstName} required onChange={this.handleChange}/>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className="lastName" value={lastName} required onChange={this.handleChange}/>
          </Fragment>
        }

        <label htmlFor="email">Email:</label>
        <input type="text" className="email" value={email} required onChange={this.handleChange}/>

        <label htmlFor="password">Password:</label>
        <input type="password" className="password" value={password} required onChange={this.handleChange}/>

        <button type="submit">{action}</button>
      </form>
    );
  }
}