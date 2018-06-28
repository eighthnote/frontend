import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadFriends, sendFriendRequest, acceptFriendRequest } from './actions';
import { getFriends } from './reducers';

class Friends extends PureComponent {
  static propTypes = {
    friends: PropTypes.array,
    loadFunction: PropTypes.func.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired
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
    this.props.sendFriendRequest();
  };

  handleAcceptFriend = event => {
    this.props.acceptFriendRequest(event.target.id);
    window.location.reload();
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
        <h3>Pending Friend Requests</h3>
        <ul>
          {friends[1] && friends[1].map((friend, i) => (
            <li key={i}>{friend.firstName}<button id={friend._id} onClick={this.handleAcceptFriend}>Accept</button></li>
          ))}
        </ul>
        <h3>Friends</h3>
        <ul>
          {friends[0] && friends[0].map((friend, i) => (
            <li key={i}>{friend.firstName}</li>
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
  { loadFriends, sendFriendRequest, acceptFriendRequest }
)(Friends);
