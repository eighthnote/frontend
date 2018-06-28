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
          <h3>{name || 'N/A'}</h3>
          <p>Date: {date || 'N/A'}</p>
          <p>Expiration: {expiration || 'N/A'}</p>
          <p>Priority: {priority || 'N/A'}</p>
          <p>Type: {type || 'N/A'}</p>
          <p>Repeats?: {repeats || 'N/A'}</p>
          <p>Participants: {participants || 'N/A'}</p>
          <p>Group Size: {groupSize || 'N/A'}</p>
          <p>Confirmed?: {confirmed || 'N/A'}</p>
        </div>
      </li>
    );
  }
}