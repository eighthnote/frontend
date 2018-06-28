import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, getGivingArray, getRequestingArray } from './reducers';
import { loadProfile } from './actions';
import PictureForm from './PictureForm';
import ContactForm from './ContactForm';
import AvailabilityForm from './AvailabilityForm';
import Shareable from './Shareable';
import { capitalize } from '../../utils/formatters';
import styles from './Profile.css';

class Profile extends PureComponent {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object.isRequired,
    isUser: PropTypes.bool,
    loadProfile: PropTypes.func.isRequired,
    profile: PropTypes.object,
    giving: PropTypes.array,
    requesting: PropTypes.array
  };

  state = {
    editingPicture: false,
    editingContact: false,
    editingAvailability: false
  };

  handleProfileLoad = () => {
    const { match, isUser, loadProfile } = this.props;
    isUser ? loadProfile() : loadProfile(match.params.id);
  };
 
  componentDidMount() {
    this.handleProfileLoad();
  }

  componentDidUpdate({ location }) {
    const locationPreUpdate = location.pathname;
    const locationPostUpdate = this.props.location.pathname;
    if(locationPreUpdate === locationPostUpdate) return;
    this.handleProfileLoad();
  }

  handleFormToggle = key => {
    this.setState(prevState => ({ [key]: !prevState[key] }));
  };

  render() {
    const { profile, giving, requesting, isUser } = this.props;
    const { editingPicture, editingContact, editingAvailability } = this.state;

    if(!profile) return null;

    const { firstName, lastName, pictureUrl, availability, contact } = profile;

    return (
      <section className={styles.profile}>
        {pictureUrl ? 
          <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
          : <div className="filler-image">:)</div>}
        {isUser && <button onClick={() => this.handleFormToggle('editingPicture')}>{editingPicture ? 'CLOSE' : 'EDIT'}</button>}
        {isUser && editingPicture && <PictureForm onDone={this.handleFormToggle}/>}
        <h2>{firstName} {lastName}</h2>
        <h4>Preferred Contact Info:</h4>
        <p>{contact}</p>
        {isUser && <button onClick={() => this.handleFormToggle('editingContact')}>{editingContact ? 'CLOSE' : 'EDIT'}</button>}
        {isUser && editingContact && <ContactForm onDone={this.handleFormToggle}/>}
        <h4>Best Availability:</h4>
        <ul>
          {availability && availability.days && availability.days.map((item, i) => <li key={i}>{capitalize(item)}</li>)}
        </ul>
        <p>{availability && availability.notes}</p>
        {isUser && <button onClick={() => this.handleFormToggle('editingAvailability')}>{editingAvailability ? 'CLOSE' : 'EDIT'}</button>}
        {isUser && editingAvailability && <AvailabilityForm onDone={this.handleFormToggle}/>}
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
  }),
  { loadProfile }
)(Profile);
