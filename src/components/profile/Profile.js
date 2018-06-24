import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.css';

export default class Profile extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isUser: PropTypes.bool
  };

  render() {
    const { user, isUser = false } = this.props;
    const { picture, firstName, lastName, preferredContact, additionalContact, availability, offering, wanting } = user;

    return (
      <section className={styles.profile}>
        <img src={picture} alt={`profile picture for ${firstName}`}/>
        <h2>{firstName} {lastName}</h2>
        <h4>preferred contact info:</h4>
        <span>{preferredContact.type}</span>
        <span>{preferredContact.details}</span>
        {!!additionalContact.length &&
        <Fragment>
          <h4>additional contact info:</h4>
          <ul>
            {
              additionalContact.map(item => {
                return <li key={item._id}>
                  <span>{additionalContact.type}</span>
                  <span>{additionalContact.details}</span>
                </li>;
              })
            }
          </ul>
        </Fragment>}
        <h4>availability notes:</h4>
        <span>{availability}</span>
        <h3>offering:</h3>
        <ul>
          
        </ul>
      </section>
    );
  }
}