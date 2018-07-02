import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from './actions';

class PictureForm extends PureComponent {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired
  };

  state = {
    pictureUrl: ''
  };
 
  handleChange = ({ target }) => {
    this.setState({ pictureUrl: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile(this.state)
      .then(() => this.props.onDone('editingPicture'));
  };

  render() {
    const { pictureUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="picture">Enter an Image URL:</label>
        <input id="picture" type="text" required value={pictureUrl} onChange={this.handleChange}/>
        <button className="save-button" type="submit">SAVE</button>
      </form>
    );
  }
}

export default connect(
  null,
  { updateProfile }
)(PictureForm);
