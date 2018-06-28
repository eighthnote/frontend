import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedShareable from './FeedShareable';

import { loadFeed } from './actions';
import { getFeed } from './reducers';

class Feed extends PureComponent {
  static propTypes = {
    feed: PropTypes.array.isRequired,
    loadFeed: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadFeed();
  }

  render() {
    const { feed } = this.props;

    if(!feed) return null;

    return (
      <div>
        <h1>TEST</h1>
        <ul>
          {feed && feed.map((shareable, i) => (
            <FeedShareable
              key={i}
              {...shareable}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    feed: getFeed(state)
  }),
  { loadFeed, getFeed }
)(Feed);