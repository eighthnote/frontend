import React, { Component } from 'react';
import styles from './Feed.css';
import starMan from '../images/starMan.png';
import twoHearts from '../images/twoHearts.png';
import groupPlan from '../images/groupPlan.png';


class Feed extends Component {
  render() {
    return (
      <div className={styles.feed}>
        {/* <h2>My feed!</h2> */}
        <section className="planOne">
          <p>Plan 1</p>
          <img src={starMan} alt="man with star"/>
          <img src={twoHearts} alt="two people icons sharing a heart"/>
          <img src={groupPlan} alt="group icon"/>
        </section>
        <section className="planTwo">
          <p>Plan 2</p>
          <img src={starMan} alt="man with star"/>
          <img src={twoHearts} alt="two people icons sharing a heart"/>
          <img src={groupPlan} alt="group icon"/>
        </section>
        <section className="planThree">
          <p>Plan 3</p>
          <img src={starMan} alt="man with star"/>
          <img src={twoHearts} alt="two people icons sharing a heart"/>
          <img src={groupPlan} alt="group icon"/>
        </section>
        <section className="planFour">
          <p>Plan 4</p>
          <img src={twoHearts} alt="two people icons sharing a heart"/>
          <img src={groupPlan} alt="group icon"/>
        </section>
        <section className="planFive">
          <p>Plan 5</p>
          <img src={twoHearts} alt="two people icons sharing a heart"/>
          <img src={groupPlan} alt="group icon"/>
        </section>
        <section className="planSix">
          <p>Plan 6</p>
          <img src={twoHearts} alt="two people icons sharing a heart"/>
          <img src={groupPlan} alt="group icon"/>
        </section>
        <section className="planSeven">
          <p>Plan 7</p>
          <img src={twoHearts} alt="two people icons sharing a heart"/>
          <img src={groupPlan} alt="group icon"/>
        </section>
      </div>
    );
  }
}

export default Feed;
