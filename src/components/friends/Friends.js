import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Friend from './Friend';
import styles from './Friends.css';
import { getError } from '../app/reducers';
import { clearError } from '../app/actions';
import { loadFriends,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend
} from './actions';
import { getFriends } from './reducers';

class Friends extends PureComponent {
  static propTypes = {
    allFriends: PropTypes.object,
    sendFriendRequest: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    loadFriends: PropTypes.func.isRequired,
    removeFriend: PropTypes.func.isRequired,
    error: PropTypes.object,
    clearError: PropTypes.func.isRequired
  };

  state = {
    addFriendForm: ''
  };

  componentDidMount() {
    this.props.loadFriends();
  }

  handleChange = ({ target }) => {
    const { error, clearError } = this.props;
    if(error) clearError();
    this.setState({ addFriendForm: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendFriendRequest({ email: `${this.state.addFriendForm}` })
      .then(() => alert('Friend request sent! If your friend does not receive the request, please check the spelling of their email.'));
    this.setState({ addFriendForm: '' });
  };

  handleAcceptFriend = ({ target }) => {
    const { acceptFriendRequest, loadFriends } = this.props;
    acceptFriendRequest(target.id);
    loadFriends();
  };

  handleRemoveFriend = ({ target }) => {
    const { removeFriend, loadFriends } = this.props;
    if(confirm('This will remove your friend, and remove you from their friends list. Are you sure you want to do this?')) {
      removeFriend(target.id);
      loadFriends();
    }
  };

  render() {
    const { allFriends, error } = this.props;
    if(!allFriends) return null;

    const { friends, pendingFriends } = allFriends;
    const { addFriendForm } = this.state;

    return (
      <div className={styles.friends}>
        <h3>Add a Friend</h3>
        <form className="friend-add-form" onSubmit={this.handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="add-friend">Enter your friend&apos;s email:</label>
            <input onChange={this.handleChange} id="add-friend" name="addFriendForm" type="text" required value={addFriendForm}/>
          </div>
          <button type="submit">SEND REQUEST</button>
        </form>
        <div className="friend-error">{!!error && <span>{error.error}</span>}</div>

        <div className="friend-list">
          {pendingFriends && !!pendingFriends.length && <h3>Pending Friend Requests</h3>}
          <ul>
            {pendingFriends && pendingFriends.map(friend => (
              <li key={friend._id}>
                {friend.firstName}<button id={friend._id} onClick={this.handleAcceptFriend}>ACCEPT</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="friend-list">        
          <h3>Friends</h3>
          <ul>
            {friends && !!friends.length ? friends.map((friend, i) => (
              <span className="existing-friends" key={i}>
                <button id={friend._id} className="remove-friend" onClick={this.handleRemoveFriend}>&times;</button>
                <Link to={`/friends/${friend._id}`}>
                  <Friend
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    pictureUrl={friend.pictureUrl}
                  />
                </Link>
              </span>
            )) : <li>No friends yet!</li>}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    allFriends: getFriends(state),
    error: getError(state)
  }),
  { loadFriends,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    clearError
  }
)(Friends);
