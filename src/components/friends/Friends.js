import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadFriends, sendFriendRequest } from './actions';
import { getFriends } from './reducers';

class Friends extends PureComponent {
  static propTypes = {
    friends: PropTypes.array,
    loadFunction: PropTypes.func.isRequired,
    sendFriendRequest: PropTypes.func.isRequired
  };

  state = {
    addFriendForm: ''
  };

  componentDidMount() {
    this.props.loadFunction();
  }

  handleChange = ({ target }) => {
    this.setState({ addFriendForm: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendFriendRequest({});
  };

  render() {
    const { friends } = this.props;
    const { addFriendForm } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Add a Friend</label>
          <input onChange={this.handleChange} name="addFriendForm" type="text" value={addFriendForm}/>
          <button type="submit">Send Request</button>
        </form>
        <ul>
          {friends.map((friend, i) => (
            <li key={i}>{friend}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    friends: getFriends(state)
  }),
  { loadFriends, sendFriendRequest }
)(Friends);