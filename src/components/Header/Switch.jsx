import React from "react";
import Option from "./Option";
import styles from "./Switch.module.css";
const Switch = (props) => {
    return (
        <div className={styles["theme__toggle"]}>
            <Option
                id="dark"
                label="1"
                onChange={props.onChange}
                checked={props.theme === "dark"}
            />
            <Option
                id="light"
                label="2"
                onChange={props.onChange}
                checked={props.theme === "light"}
            />
            <Option
                id="alt"
                label="3"
                onChange={props.onChange}
                checked={props.theme === "alt"}
            />
        </div>
    );
};

export default Switch;
