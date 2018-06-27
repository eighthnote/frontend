import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class DayPicker extends Component {
  static propTypes = {
    handleCheckboxChange: PropTypes.func.isRequired,
    days: PropTypes.object.isRequired
  };

  render() {
    const { handleCheckboxChange, days } = this.props;

    const dayNames = Object.keys(days);
    const capitalize = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    
    const options = dayNames.map(day => {

      return (
        <div className="checkbox" key={day}>
          <label>{capitalize(day)}</label>
          <input onChange={event => handleCheckboxChange(event)} type='checkbox' name={day} 
            checked={days[day]}/>
        </div>
      );
    });

    return (
      <Fragment>
        {options}
      </Fragment>
    );
  }
}