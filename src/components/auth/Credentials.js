import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getError } from '../app/reducers';
import { clearError } from '../app/actions';
import styles from './Credentials.css';

class Credentials extends PureComponent {
  static propTypes = {
    submitCredentials: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    includeName: PropTypes.bool,
    error: PropTypes.object,
    clearError: PropTypes.func.isRequired
  };

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  handleChange = ({ target }) => {
    const { error, clearError } = this.props;
    if(error) clearError();
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
      <form onSubmit={this.handleSubmit} className={styles.credentials}>
        <div className="input-wrapper">
          {includeName &&
        <Fragment>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} required onChange={this.handleChange}/>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} required onChange={this.handleChange}/>
        </Fragment>}

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} required onChange={this.handleChange}/>

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} required onChange={this.handleChange}/>

          <button type="submit">{action}</button>
        </div>
      </form>
    );
  }
}

export default connect(
  state => ({
    error: getError(state)
  }),
  { clearError }
)(Credentials);