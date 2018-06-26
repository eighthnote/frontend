import React, { Component } from 'react';

export default class Checkbox extends Component {
  
state = {
  options: [
    { value: 'sunday', text: 'Sunday' },
    { value: 'monday', text: 'Monday' },
    { value: 'tuesday', text: 'Tuesday' },
    { value: 'wednesday', text: 'Wednesday' },
    { value: 'thursday', text: 'Thursday' },
    { value: 'friday', text: 'Friday' },
    { value: 'saturday', text: 'Saturday' }
  ]
};

handleClick(e) {
  //console.log(e.target.value);
}
  

render() {
  const options = this.state.options.map(option => {
    return (
      <div key={option.value}>
        <label>{option.text}</label>
        <input onClick={this.handleClick} type='checkbox' name={option.value} 
          value={option.value}/>
      </div>
    );
  });


  return (
    <div className='checkbox'>
      <form>
        {options}
      </form>
    </div>
  );
}
}