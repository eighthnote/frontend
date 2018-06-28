import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from './actions';

class ContactForm extends PureComponent {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
  };

  state = {
    contact: ''
  };
 
  handleChange = ({ target }) => {
    this.setState({ contact: [target.value] });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile(this.state);
  };

  render() {
    const { contact } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Enter Your Preferred Contact Info:</label>
        <input type="text" value={contact} onChange={this.handleChange}/>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}

export default connect(
  null,
  { updateProfile }
)(ContactForm);
