import React from "react";
import styles from "./Header.module.css";
import Switch from "./Switch";

const Header = (props) => {
    return (
        <div className={styles["calc__header"]}>
            <h1 className={styles["calc__title"]}>calc</h1>
            <div className={styles["calc__theme"]}>
                <h2>Theme</h2>
                <Switch onChange={props.onChange} theme={props.theme} />
            </div>
        </div>
    );
};

export default Header;
