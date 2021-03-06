import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../utils/formatters';

export default class DayPicker extends Component {
  static propTypes = {
    handleCheckboxChange: PropTypes.func.isRequired,
    days: PropTypes.object.isRequired
  };

  render() {
    const { handleCheckboxChange, days } = this.props;

    const dayNames = Object.keys(days);
    
    return (
      <Fragment>
        {dayNames.map(day => (
          <div className="checkbox" key={day}>
            <input onChange={event => handleCheckboxChange(event)} id={day} type='checkbox' name={day} checked={days[day]}/>
            <label htmlFor={day}>{capitalize(day)}</label>
          </div>
        ))}
      </Fragment>
    );
  }
}