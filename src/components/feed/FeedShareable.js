import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FeedShareable extends Component {
  static propTypes = {
    name: PropTypes.any,
    date: PropTypes.any,
    priority: PropTypes.any,
    type: PropTypes.any,
    repeats: PropTypes.any,
    participants: PropTypes.any,
    groupSize: PropTypes.any,
    confirmed: PropTypes.any,
    expiration: PropTypes.any
  };

  render() {
    const { name, date, priority, type, repeats, participants, groupSize, confirmed, expiration } = this.props;

    return (
      <li>
        <div>
          <p>{name}</p>
          <p>{date}</p>
          <p>{expiration}</p>
          <p>{priority}</p>
          <p>{type}</p>
          <p>{repeats}</p>
          <p>{participants}</p>
          <p>{groupSize}</p>
          <p>{confirmed}</p>
        </div>
      </li>
    );
  }
}