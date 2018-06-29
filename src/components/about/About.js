import React, { PureComponent } from 'react';
import styles from './About.css';

export default class About extends PureComponent {
  render() {
    return (
      <div className={styles.about}>
        <p>We built Shareable out of a desire for true personal connection.</p>
        <p>Its purpose is to help friends interact in ways that allow us to increase feelings of community and belonging.</p>
        <p>
          In our world today, people are linked more than at any other point in history. We have friends from all around the globe, yet depression and loneliness are on the rise. More individuals feel isolated and disconnected than ever before.
        </p>
        <p>
          A Harvard health study, spanning more than 75 years, reveals that close relationships are what keep us happy throughout our lives. These ties protect us from life’s discontents, help delay mental and physical decline, and are better predictors of long and happy lives than social class, IQ, or even genes.
        </p>
        <p>
          Decades of research also show that giving to others increases our own joy. Measuring hormones and activity in our bodies and brains when being helpful or cooperative lights up our pleasure centers. We are, quite literally, hard-wired to be generous with others.
        </p>
        <p>
          There are wonderful resources available to help enhance personal happiness.  There are also incredible social platforms that help us communicate with one another.  We feel Shareable brings an opportunity for these to overlap. Spending time with someone who matters to you, knowing you are there for them when they need support, and that they are there for you is the crucial ingredient in the recipe for happiness. Shareable is not only about what we need for our own happiness, but what we each have to give to each other.
        </p>
        <p>
          Join Shareable and see what you have to gain by sharing what you have to give.
        </p>
        <p> 
          You can find the people behind Shareable at <a href="https://github.com/eighthnote" target="_blank">https://github.com/eighthnote</a>.
        </p>
      </div>
    );
  }
}

