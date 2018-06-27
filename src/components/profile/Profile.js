import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, updateUser, addShareable } from './actions';
import { getAccount } from '../auth/reducers';
import { getCurrentUser, getGivingArray, getRequestingArray } from './reducers';
import DayPicker from './DayPicker';
import ShareableForm from './ShareableForm';
import { capitalize, formatDate } from '../../utils/formatters';
import styles from './Profile.css';

const _id = '5b327868cf85ff348f7775e4';

class Profile extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    giving: PropTypes.array,
    requesting: PropTypes.array,
    updateUser: PropTypes.func.isRequired,
    addShareable: PropTypes.func.isRequired
  };

  state = {
    days: { 
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
    notes: ''
  };
 
  componentDidMount() {
    const { match } = this.props;
    const id = match.url === '/profile' ? _id : match.params.id;
    this.props.loadUser(id);
  }

  handleChange = ({ target }) => {
    const { type, name, checked, value } = target;
    type === 'checkbox' ?
      this.setState(prevState => ({ days: { ...prevState.days, [name]: checked } }))
      : this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { days, notes } = this.state;
    const dayArray = Object.keys(days);
    const checkedDays = dayArray.filter(day => days[day]);
    this.props.updateUser(_id, {
      availability: {
        days: checkedDays,
        notes
      }
    });
  };

  render() {
    const { user, giving, requesting, addShareable } = this.props;
    const { notes, days } = this.state;

    if(!user) return null;

    const { firstName, lastName, pictureUrl, availability, contact } = user;

    return (
      <section className={styles.profile}>
        <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
        <h2>{firstName} {lastName}</h2>
        <h4>Contact Info:</h4>
        <ul>
          {contact.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h4>Best Days:</h4>
        <ul>
          {availability.days.map((item, i) => <li key={i}>{capitalize(item)}</li>)}
        </ul>
        <p>{availability.notes}</p>
        <form onSubmit={this.handleSubmit}>
          <DayPicker handleCheckboxChange={this.handleChange} days={days}/>
          <label>Notes</label>
          <input onChange={this.handleChange} name="notes" type="text" value={notes}/>
          <button type="submit">save</button>
        </form>
        <h3>Giving:</h3>
        <ShareableForm shareableType="giving" action="ADD" onComplete={addShareable}/>
        <ul>
          {giving.map(item => <li key={item._id}>{item.name} {item.date && `(by ${formatDate(item.date)})`}</li>)}
        </ul>
        <h3>Requesting:</h3>
        <ShareableForm shareableType="requesting" action="ADD" onComplete={addShareable}/>
        <ul>
          {requesting.map(item => <li key={item._id}>{item.name}</li>)}
        </ul>
      </section>
    );
  }
}

export default connect(
  state => ({
    account: getAccount(state),
    user: getCurrentUser(state),
    giving: getGivingArray(state),
    requesting: getRequestingArray(state)
  }),
  { loadUser, updateUser, addShareable }
)(Profile);
