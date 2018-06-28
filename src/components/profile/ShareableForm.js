import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { localizeDate } from '../../utils/formatters';

export default class ShareableForm extends PureComponent {
  static propTypes = {
    shareableType: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired
  };

  state = {
    name: '',
    date: ''
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { shareableType, onComplete } = this.props;
    let { name, date } = this.state;
    if(date) {
      date = localizeDate(date);
    }
    const submission = { name, date, type: shareableType };
    onComplete(submission);
    this.setState({
      name: '',
      date: ''
    });
  };

  render() {
    const { action } = this.props;
    const { name, date } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" value={name} required onChange={this.handleChange}/>
        <input type="date" name="date" value={date} onChange={this.handleChange}/>
        <button type="submit">{action}</button>
      </form>
    );
  }
}