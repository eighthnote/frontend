import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from './actions';

class ContactForm extends PureComponent {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired
  };

  state = {
    contact: ''
  };
 
  handleChange = ({ target }) => {
    this.setState({ contact: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile(this.state)
      .then(() => this.props.onDone('editingContact'));
  };

  render() {
    const { contact } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="contact">How should friends contact you?</label>
        <input id="contact" type="text" value={contact} required onChange={this.handleChange}/>
        <button className="save-button" type="submit">SAVE</button>
      </form>
    );
  }
}

export default connect(
  null,
  { updateProfile }
)(ContactForm);
