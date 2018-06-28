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
    date: '',
    priority: false
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { shareableType, onComplete } = this.props;
    let { name, date, priority } = this.state;
    if(priority) {
      priority = 2;
    }
    if(date) {
      date = localizeDate(date);
    }
    const submission = { name, date, priority, type: shareableType };
    onComplete(submission);
    this.setState({
      name: '',
      date: '',
      priority: false
    });
  };

  render() {
    const { action, shareableType } = this.props;
    const { name, date, priority } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={`${shareableType}-name`}>Description:</label>
        <input id={`${shareableType}-name`} type="text" name="name" value={name} required onChange={this.handleChange}/>
        <label htmlFor={`${shareableType}-date`}>By: (optional)</label>
        <input id={`${shareableType}-date`} type="date" name="date" value={date} onChange={this.handleChange}/>
        <label htmlFor={`${shareableType}-priority`}>Mark as High Priority</label>
        <input id={`${shareableType}-priority`} type="checkbox" name="priority" checked={priority} onChange={this.handleChange}/>
        <button type="submit">{action}</button>
      </form>
    );
  }
}