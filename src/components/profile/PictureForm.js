import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from './actions';

class PictureForm extends PureComponent {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired
  };

  state = {
    pictureUrl: ''
  };
 
  handleChange = ({ target }) => {
    this.setState({ pictureUrl: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile(this.state);
  };

  render() {
    const { pictureUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Enter an Image URL</label>
        <input type="text" value={pictureUrl} onChange={this.handleChange}/>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}

export default connect(
  null,
  { updateProfile }
)(PictureForm);
