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
    expiration: '',
    priority: false
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { shareableType, onComplete } = this.props;
    let { name, expiration, priority } = this.state;
    if(priority) {
      priority = 2;
    }
    if(expiration) {
      expiration = localizeDate(expiration);
    }
    const submission = { name, expiration, priority, type: shareableType };
    onComplete(submission);
    this.setState({
      name: '',
      expiration: '',
      priority: false
    });
  };

  render() {
    const { action, shareableType } = this.props;
    const { name, expiration, priority } = this.state;

    return (
      <form className="shareable-form" onSubmit={this.handleSubmit}>
        <div className="description">
          <label htmlFor={`${shareableType}-name`}>Description:</label>
          <input id={`${shareableType}-name`} type="text" name="name" value={name} required onChange={this.handleChange}/>
        </div>

        <div className="expiration">
          <label htmlFor={`${shareableType}-expiration`}>By (optional):</label>
          <input id={`${shareableType}-expiration`} type="date" name="expiration" value={expiration} onChange={this.handleChange}/>
        </div>
    
        <div className="priority">
          <label htmlFor={`${shareableType}-priority`}>Urgent?</label>
          <input id={`${shareableType}-priority`} type="checkbox" name="priority" checked={priority} onChange={this.handleChange}/>
        </div>

        <button className="save-button" type="submit">{action}</button>
      </form>
    );
  }
}