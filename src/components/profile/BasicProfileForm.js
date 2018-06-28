import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from './actions';

class BasicProfileForm extends PureComponent {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    stateKey: PropTypes.string.isRequired
  };

  state = {
    [this.props.stateKey]: ''
  };
 
  handleChange = ({ target }) => {
    this.setState({ [this.props.stateKey]: [target.value] });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile(this.state);
  };

  render() {
    const { label, stateKey } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>{label}</label>
        <input type="text" value={this.state[stateKey]} onChange={this.handleChange}/>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}

export default connect(
  null,
  { updateProfile }
)(BasicProfileForm);
