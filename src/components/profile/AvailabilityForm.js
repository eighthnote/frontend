import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from './actions';
import DayPicker from './DayPicker';

class AvailabilityForm extends PureComponent {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired
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
    this.props.updateProfile({
      availability: {
        days: checkedDays,
        notes
      }
    })
      .then(() => this.props.onDone('editingAvailability'));
  };

  render() {
    const { notes, days } = this.state;

    return (
      <form className="availability-form" onSubmit={this.handleSubmit}>
        <DayPicker handleCheckboxChange={this.handleChange} days={days}/>
        <label htmlFor="notes">Notes:</label>
        <input onChange={this.handleChange} id="notes" name="notes" type="text" value={notes}/>
        <button className="save-button" type="submit">SAVE</button>
      </form>
    );
  }
}

export default connect(
  null,
  { updateProfile }
)(AvailabilityForm);
