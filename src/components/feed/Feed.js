import React, { Component } from 'react';
import styles from './Feed.css';

class Feed extends Component {
  render() {
    return (
      <section className={styles.feed}>
        <h2>My feed!</h2>
        <div className="plan">
          <p className="planOne">Plan 1</p>
          <p className="planTwo">Plan 2</p>
          <p className="planThree">Plan 3</p>
          <p className="planFour">Plan 4</p>
          <p className="planFive">Plan 5</p>
          <p className="planSix">Plan 6</p>
          <p className="planSeven">Plan 7</p>
        </div>
      </section>
    );
  }
}

export default Feed;