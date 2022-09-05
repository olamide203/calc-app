import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
import InputContext from "../../context/InputContext";

function Button({ children, data, type, version, form }) {
    const { dispatch, ACTIONS } = useContext(InputContext);

    const handleClick = () => {
        switch (version) {
            case "display":
                dispatch({ type: ACTIONS.DISPLAY, payload: { data } });
                break;
            case "reset":
                dispatch({ type: ACTIONS.RESET });
                break;
            case "delete":
                dispatch({ type: ACTIONS.DELETE_BACKWARD });
            default:
                break;
        }
    };
    return (
        <button
            type={type}
            onClick={handleClick}
            className={`${styles.btn} ${styles[`btn-${version}`]}`}
            form={form}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: "button",
    version: "display",
    data: "",
    form: "",
};

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
    display: PropTypes.string,
};
export default Button;