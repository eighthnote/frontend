import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, getGivingArray, getRequestingArray } from './reducers';
import Shareable from './Shareable';
import { capitalize } from '../../utils/formatters';
import styles from './Profile.css';
import AvailabilityForm from './AvailabilityForm';

class Profile extends PureComponent {
  static propTypes = {
    loadFunction: PropTypes.func.isRequired,
    profile: PropTypes.object,
    giving: PropTypes.array,
    requesting: PropTypes.array
  };

  state = {
    imageUrl: ''
  };
 
  componentDidMount() {
    this.props.loadFunction();
  }

  render() {
    const { profile, giving, requesting } = this.props;
    const { imageUrl } = this.state;

    if(!profile) return null;

    const { firstName, lastName, pictureUrl, availability, contact } = profile;

    return (
      <section className={styles.profile}>
        {pictureUrl ? 
          <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
          : <div className="filler-image">:)</div>}
        <form>
          <label>Enter an Image URL</label>
          <input type="text" value={imageUrl}/>
          <button>SAVE</button>
        </form>
        <h2>{firstName} {lastName}</h2>
        <h4>Contact Info:</h4>
        <ul>
          {contact.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h4>Best Days:</h4>
        <ul>
          {availability && availability.days && availability.days.map((item, i) => <li key={i}>{capitalize(item)}</li>)}
        </ul>
        <p>{availability && availability.notes}</p>
        <AvailabilityForm/>
        <Shareable heading="Giving" shareableType="giving" shareable={giving}/>
        <Shareable heading="Requesting" shareableType="requesting" shareable={requesting}/>
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
