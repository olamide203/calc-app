import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import styles from "./Display.module.css";
import InputContext from "../../context/InputContext";
function Input() {
    const { inputState, dispatch, ACTIONS } = useContext(InputContext);
    const inputRef = useRef();
    // when the Display state changes, let the input element be in focus and
    // set the caret position to the current value in the display state
    useEffect(() => {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(
            inputState.selectionStart,
            inputState.selectionEnd
        );
    }, [inputState]);

    // enable state change through keyboard events
    const handleChange = (event) => {
        switch (event.nativeEvent.inputType) {
            case "deleteContentBackward":
                dispatch({ type: ACTIONS.DELETE_BACKWARD });
                break;
            case "deleteContentForward":
                dispatch({ type: ACTIONS.DELETE_FORWARD });
                break;
            case "deleteByCut":
                dispatch({ type: ACTIONS.DELETE_SELECTION });
                break;
            case "insertFromPaste":
                navigator.clipboard.readText().then((text) => {
                    dispatch({
                        type: ACTIONS.DISPLAY,
                        payload: { data: text },
                    });
                });
                break;
            default:
                dispatch({
                    type: ACTIONS.DISPLAY,
                    payload: { data: event.nativeEvent.data },
                });
                break;
        }
    };

    // update caret position onSelectionChange
    const handleSelectionChange = () => {
        dispatch({
            type: ACTIONS.SELECTION_CHANGE,
            payload: {
                selectionStart: inputRef.current.selectionStart,
                selectionEnd: inputRef.current.selectionEnd,
            },
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: ACTIONS.EVALUATE });
    };
    return (
        <form
            className={styles.display}
            onSubmit={handleSubmit}
            id="display-form"
        >
            <input
                onInput={handleChange}
                onSelect={handleSelectionChange}
                className={styles.input}
                type="text"
                value={inputState.expression}
                ref={inputRef}
            />
            <input
                type="text"
                value={inputState.evaluation}
                className={`${styles.input} ${styles["input-display"]}`}
                readOnly
            />
        </form>
    );
}
export default Input;
