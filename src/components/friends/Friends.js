import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Friend from './Friend';
import styles from './Friends.css';

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
      <div className={styles.friends}>
        <h3>Add a Friend</h3>
        <form className="friend-add-form" onSubmit={this.handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="add-friend">Enter your friend&apos;s email:</label>
            <input onChange={this.handleChange} id="add-friend" name="addFriendForm" type="text" required value={addFriendForm}/>
          </div>
          <button type="submit">SEND REQUEST</button>
          {friendMessage && <p>{friendMessage}</p>}
        </form>

        <div className="friend-list">
          {friends[1] && !!friends[1].length && <h3>Pending Friend Requests</h3>}
          <ul>
            {friends[1] && friends[1].map(friend => (
              <li key={friend._id}>
                {friend.firstName}<button id={friend._id} onClick={this.handleAcceptFriend}>ACCEPT</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="friend-list">        
          <h3>Friends</h3>
          <ul>
            {friends[0] && friends[0].map((friend, i) => (
              <span className="existing-friends" key={i}>
                <button id={friend._id} className="remove-friend" onClick={this.handleRemoveFriend}>&times;</button>
                <Link to={`/friends/${friend._id}`}>
                  <Friend
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    imageUrl={friend.imageUrl}
                  />
                </Link>
              </span>
            ))}
          </ul>
        </div>
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
