import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
import InputContext from '../../context/InputContext';

function Button({ children, data, type, version, form }) {
  const { inputState, dispatch, ACTIONS } = useContext(InputContext);

  const handleClick = () => {
    console.log(version);
    switch (version) {
      case 'delete':
        inputState.start === inputState.end
          ? dispatch({ type: ACTIONS.DELETE })
          : dispatch({ type: ACTIONS.DELETE_SELECTION });
        break;
      case 'display':
        dispatch({ type: ACTIONS.ENTER, payload: { data } });
        break;
      case 'reset':
        dispatch({ type: ACTIONS.RESET });
        break;
      default:
        break;
    }
  };
  const attributes = {
    className: `${styles['btn']} ${styles[`btn-${version}`]}`,
    type,
    onClick: handleClick,
  };
  if (form) {
    attributes.form = form;
  }
  return <button {...attributes}>{children}</button>;
}

Button.defaultProps = {
  type: 'button',
  version: 'display',
  data: '',
  form: '',
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  display: PropTypes.string,
};
export default Button;
