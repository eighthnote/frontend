import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addShareable, removeShareable } from './actions';
import ShareableForm from './ShareableForm';
import { formatDate } from '../../utils/formatters';
import styles from './Shareable.css';

class Shareable extends PureComponent {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    shareableType: PropTypes.string.isRequired,
    shareable: PropTypes.array.isRequired,
    addShareable: PropTypes.func.isRequired,
    removeShareable: PropTypes.func.isRequired,
    isUser: PropTypes.bool
  };

  state = {
    editing: false
  };

  handleFormToggle = () => {
    this.setState(prevState => ({ editing: !prevState.editing }));
  };

  handleClick = (id, shareableType) => {
    if(confirm('Are you sure you\'d like to delete this shareable?')) this.props.removeShareable(id, shareableType);
  };

  render() {
    const { heading, shareableType, shareable, addShareable, isUser } = this.props;
    const { editing } = this.state;

    return (
      <section className={styles.shareable}>
        <div className="button-and-heading">
          {isUser && <button className={editing ? 'editing add-button' : 'add-button'} onClick={this.handleFormToggle}>&#65291;</button>}     
          <h4>{heading}:</h4>
        </div>
        {isUser && editing && <ShareableForm shareableType={shareableType} action="ADD" onComplete={addShareable}/>}
        <ul>
          {shareable.map(item => (
            <li key={item._id}>
              {!!item.priority && <span className="accessible-priority">urgent</span>}
              <span className={item.priority ? 'high-priority shareable-info' : 'shareable-info'}>
                {item.name}
                {item.expiration && ` (by ${formatDate(item.expiration)})`}
                {isUser && <button className="remove" onClick={() => this.handleClick(item._id, shareableType)}>&times;</button>}
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default connect(
  null,
  { addShareable, removeShareable }
)(Shareable);
