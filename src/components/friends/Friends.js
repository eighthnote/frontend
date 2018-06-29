import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Friend from './Friend';

import { Link } from 'react-router-dom';

import { loadFriends,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend
} from './actions';

import { getFriends } from './reducers';

class Friends extends PureComponent {
  static propTypes = {
    friends: PropTypes.array,
    sendFriendRequest: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    loadFriends: PropTypes.func.isRequired,
    removeFriend: PropTypes.func.isRequired
  };

  state = {
    addFriendForm: '',
    friendMessage: null
  };

  componentDidMount() {
    this.props.loadFriends();
  }

  handleChange = ({ target }) => {
    this.setState({ addFriendForm: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendFriendRequest({ email: `${this.state.addFriendForm}` }).then((res) => {
      this.setState({ friendMessage: res.payload });
    });
    this.setState({ addFriendForm: '' });
  };

  handleAcceptFriend = event => {
    this.props.acceptFriendRequest(event.target.id);
    this.props.loadFriends();
  };
  console.log(res.payload);

  handleRemoveFriend = event => {
    if(confirm('This will remove your friend, and remove you from their friends list. Are you sure you want to do this?')) {
      this.props.removeFriend(event.target.id);
      this.props.loadFriends();
    }
  };

  render() {
    const { friends } = this.props;
    const { addFriendForm, friendMessage } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Add a Friend</label>
          <input onChange={this.handleChange} name="addFriendForm" type="text" value={addFriendForm}/>
          <button type="submit">Send Request</button>
          {friendMessage && <p>{friendMessage}</p>}
        </form>
        <h3>Pending Friend Requests</h3>
        <ul>
          {friends[1] && friends[1].map(friend => (
            <li key={friend._id}>
              {friend.firstName}<button id={friend._id} onClick={this.handleAcceptFriend}>Accept</button>
            </li>
          ))}
        </ul>
        <h3>Friends</h3>
        <ul>
          {friends[0] && friends[0].map((friend, i) => (
            <Fragment key={i}>
              <Link to={`/friends/${friend._id}`}>
                <Friend
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  imageUrl={friend.imageUrl}
                />
              </Link>
              <button id={friend._id} onClick={this.handleRemoveFriend}>X</button>
            </Fragment>
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
  { loadFriends,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend
  }
)(Friends);
