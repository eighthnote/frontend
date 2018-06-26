import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, updateUser } from './actions';
import { getAccount } from '../auth/reducers';
import styles from './Profile.css';
import { getCurrentUser, getGivingArray, getRequestingArray } from './reducers';
import Checkbox from './Checkbox';

class Profile extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    giving: PropTypes.array,
    requesting: PropTypes.array,
    updateUser: PropTypes.func.isRequired,
  };

  state = {
    notes: ''
  };

  componentDidMount() {
    const { match } = this.props;
    const id = match.url === '/profile' ? '5b328493ee12bd61ae53736b' : match.params.id;
    this.props.loadUser(id);
  }

  handleChange = ({ target }) => {
    this.setState({ notes: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateUser(this.state);
  };

  render() {
    const { user, giving, requesting } = this.props;
    const { notes } = this.state;

    if(!user) return null;

    const { firstName, lastName, pictureUrl, availability, contact } = user;

    return (
      <section className={styles.profile}>
        <img src={pictureUrl} alt={`profile picture for ${firstName}`}/>
        <h2>{firstName} {lastName}</h2>
        <h4>contact info:</h4>
        <ul>
          {
            contact.map(item => {
              return <li key={item._id}>
                {item}
              </li>;
            })
          }
        </ul>
        <h4>availability:</h4>
        <span>{availability.days}</span>
        <form onSubmit={this.handleSubmit}>
          <Checkbox/>
          <label>Notes</label>
          <input onChange={this.handleChange} type="text" value={notes}/>
          <button type="submit">save</button>
        </form>
        <h3>giving:</h3>
        
        <ul>
          {
            giving.map(item => {
              return <li key={item._id}>
                {item.name}
              </li>;
            })
          }

        </ul>
        <h3>requesting:</h3>
        
        <ul>
          {
            requesting.map(item => {
              return <li key={item._id}>
                {item.name}
              </li>;
            })
          }

        </ul>
      </section>
    );
  }
}

export default connect(
  state => ({
    account: getAccount(state),
    user: getCurrentUser(state),
    giving: getGivingArray(state),
    requesting: getRequestingArray(state)
  }),
  { loadUser, updateUser }
)(Profile);
