import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addShareable, removeShareable } from './actions';
import ShareableForm from './ShareableForm';
import { formatDate } from '../../utils/formatters';

const _id = '5b327868cf85ff348f7775e4';

class Shareable extends PureComponent {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    shareableType: PropTypes.string.isRequired,
    shareable: PropTypes.array.isRequired,
    addShareable: PropTypes.func.isRequired,
    removeShareable: PropTypes.func.isRequired
  };

  render() {
    const { heading, shareableType, shareable, addShareable, removeShareable } = this.props;

    return (
      <section>
        <h3>{heading}:</h3>
        <ShareableForm shareableType={shareableType} action="ADD" onComplete={addShareable}/>
        <ul>
          {shareable.map(item => (
            <li key={item._id}>
              {item.name} {item.date && `(by ${formatDate(item.date)})`} <button onClick={() => removeShareable(_id, item._id, shareableType)}>&times;</button>
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
