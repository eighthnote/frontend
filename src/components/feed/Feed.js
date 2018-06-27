import React, { Component } from 'react';
import styles from './Feed.css';

class Feed extends Component {
  render() {
    return (
      <section className={styles.feed}>
        <p>My feed!</p>
      </section>
    );
  }
}

export default Feed;