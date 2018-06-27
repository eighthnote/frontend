// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { loadUser, loadFriends, updateFriends } from './actions';
// import { getAccount } from '../auth/reducers';
// //import { getCurrentUser } from './reducers';
// import styles from './Friends.css';
// import { getCurrentUser } from '../profile/reducers';

// const _id = '5b327868cf85ff348f7775e4';

// class Friends extends PureComponent {
//   static propTypes = {
//     match: PropTypes.object.isRequired,
//     user: PropTypes.object,
//     loadUser: PropTypes.func.isRequired,
//     loadFriends: PropTypes.object.isRequired,
//     updateFriends: PropTypes.func.isRequired,
//   };

//   state = {
//     requests: [],
//     pending: []

//   };
//   componentDidMount() {
//     const { match } = this.props;
//     const id = match.url === '/profile' ? _id : match.params.id;
//     this.props.loadUser(id);
//   }

//   // handleChange = ({ target }) => {
//   //   const { name } = target;
//   // };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { requests, pending } = this.state;

//   };

//   render() {
//     const { user, friends, loadFriends, updateFriends } = this.props;

//     const { requests, pending  } = this.state;

//     if(!friends) return null;

//     const { firstName, lastName, pictureUrl } = friends;

//     return (
//       <section className={styles.friends}>
//         <h1>This is where friends go.</h1>
//         <section className="requests"></section>
//         <h4>Friend Requests</h4>
//         <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
//         <h2>{firstName}</h2>
//         <section className="add"></section>
//         <label>Add Friend</label>
//         <input onChange={this.handleChange} name="add friend" type="text" value={friends}/>
//         <button type="submit">add</button>
//         {/* <input className="email"/></input> */}
//         <section className="myFriends"></section>
//         <h4>My Friends</h4>
//         <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
//         <section className="pending"></section>
//         <h4>pending friends</h4>
//         <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
//       </section>
//     );
//   }
// }

// export default connect(
//   state => ({
//     user: getCurrentUser(state),
//   }),
//   { loadUser, LoadFriends, UpdateFriends }
// )(Friends);