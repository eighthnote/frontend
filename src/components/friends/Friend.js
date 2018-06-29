import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Friend extends Component {
  static propTypes = {
    firstName: PropTypes.any,
    lastName: PropTypes.any,
    pictureUrl: PropTypes.any
  };

  render() {
    const { firstName, lastName, pictureUrl } = this.props;

    return (
      <li className="friend-list-item">
        <img src={pictureUrl ? pictureUrl : 'https://user-images.githubusercontent.com/35273043/42105486-551c71d2-7b85-11e8-8aa4-ee39ebe015d7.png'} alt={`profile picture for ${firstName} ${lastName}`}/>
        <p>{firstName} {lastName}</p>
      </li>
    );
  }
}