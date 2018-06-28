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
    if(confirm('Are you sure?')) this.props.removeShareable(id, shareableType);
  };

  render() {
    const { heading, shareableType, shareable, addShareable, isUser } = this.props;
    const { editing } = this.state;

    return (
      <section className={styles.shareable}>
        <h3>{heading}:</h3>
        {isUser && <button onClick={this.handleFormToggle}>{editing ? 'CLOSE' : '+'}</button>}     
        {isUser && editing && <ShareableForm shareableType={shareableType} action="ADD" onComplete={addShareable}/>}
        <ul>
          {shareable.map(item => (
            <li key={item._id}>
              {item.name}
              {item.date && ` (by ${formatDate(item.date)})`}
              {isUser && <button className="remove" onClick={() => this.handleClick(item._id, shareableType)}>&times;</button>}
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
