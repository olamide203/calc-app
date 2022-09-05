import React from "react";

const Option = (props) => {
    return (
        <>
            <input
                type="radio"
                name="theme"
                id={props.id}
                onChange={props.onChange}
                checked={props.checked}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </>
    );
};

export default Option;
