import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';

export default class FeedShareable extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string,
    owner: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired
  };

  render() {
    const { name, date, type, owner, ownerId } = this.props;

    return (
      <li className={type}>
        <h3 className="owner"><Link to={`/friends/${ownerId}`}>{owner}</Link> is {type}:</h3>
        <div className="content">
          <h3>{name}</h3>
          {date && <h3 className="feed-date">by {formatDate(date)}</h3>}
        </div>
      </li>
    );
  }
}