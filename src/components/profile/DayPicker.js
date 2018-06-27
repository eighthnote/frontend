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
            <label>{capitalize(day)}</label>
            <input onChange={event => handleCheckboxChange(event)} type='checkbox' name={day} checked={days[day]}/>
          </div>
        ))}
      </Fragment>
    );
  }
}