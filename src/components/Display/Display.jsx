import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import styles from './Display.module.css';
import InputContext from '../../context/InputContext';
function Input() {
  const { inputState, dispatch, ACTIONS } = useContext(InputContext);
  const inputRef = useRef();
  // when the Display state changes, let the input element be in focus and
  // set the caret position to the current value in the display state
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.setSelectionRange(inputState.start, inputState.end);
  }, [inputState]);

  // enable state change through keyboard events
  const handleInput = (event) => {
    console.log(event);
    dispatch({
      type: ACTIONS.DISPLAY,
      payload: {
        data: event.target.value,
        start: inputRef.current.selectionStart,
        end: inputRef.current.selectionEnd,
      },
    });
  };
  const handleSelect = () => {
    console.log(inputState);
    dispatch({
      type: ACTIONS.SELECT,
      payload: {
        start: inputRef.current.selectionStart,
        end: inputRef.current.selectionEnd,
      },
    });
    console.log(inputState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: ACTIONS.EVALUATE });
  };
  return (
    <form className={styles.display} onSubmit={handleSubmit} id="display-form">
      <input
        onInput={handleInput}
        onSelect={handleSelect}
        className={styles.input}
        type="text"
        value={inputState.expression}
        ref={inputRef}
        aria-label="input"
      />
      <input
        type="text"
        value={inputState.evaluation}
        className={`${styles.input} ${styles['input-display']}`}
        readOnly
        aria-label="display"
      />
    </form>
  );
}
export default Input;
