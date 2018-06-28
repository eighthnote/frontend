import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, getGivingArray, getRequestingArray } from './reducers';
import PictureForm from './PictureForm';
import BasicProfileForm from './BasicProfileForm';
import AvailabilityForm from './AvailabilityForm';
import Shareable from './Shareable';
import { capitalize } from '../../utils/formatters';
import styles from './Profile.css';

class Profile extends PureComponent {
  static propTypes = {
    isUser: PropTypes.bool,
    loadFunction: PropTypes.func.isRequired,
    profile: PropTypes.object,
    giving: PropTypes.array,
    requesting: PropTypes.array
  };
 
  componentDidMount() {
    this.props.loadFunction();
  }

  render() {
    const { profile, giving, requesting, isUser } = this.props;

    if(!profile) return null;

    const { firstName, lastName, pictureUrl, availability, contact } = profile;

    return (
      <section className={styles.profile}>
        {pictureUrl ? 
          <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
          : <div className="filler-image">:)</div>}
        {isUser && <PictureForm/>}
        <h2>{firstName} {lastName}</h2>
        <h4>Best Way to Contact:</h4>
        <ul>
          {!!contact.length && contact.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        {isUser && <BasicProfileForm stateKey="contact" label="Enter Your Preferred Contact Info"/>}
        <h4>Best Days:</h4>
        <ul>
          {availability && availability.days && availability.days.map((item, i) => <li key={i}>{capitalize(item)}</li>)}
        </ul>
        <p>{availability && availability.notes}</p>
        {isUser && <AvailabilityForm/>}
        <Shareable isUser={isUser} heading="Giving" shareableType="giving" shareable={giving}/>
        <Shareable isUser={isUser} heading="Requesting" shareableType="requesting" shareable={requesting}/>
      </section>
    );
  }
}

export default connect(
  state => ({
    giving: getGivingArray(state),
    requesting: getRequestingArray(state),
    profile: getProfile(state)
  })
)(Profile);
