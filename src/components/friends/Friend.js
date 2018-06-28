import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Friend extends Component {
  static propTypes = {
    firstName: PropTypes.any,
    lastName: PropTypes.any,
    imageUrl: PropTypes.any
  };

  render() {
    const { firstName, lastName, imageUrl } = this.props;

    return (
      <li>
        <div>
          <p>{firstName} {lastName}</p>
          <img href={imageUrl} />
        </div>
      </li>
    );
  }
}