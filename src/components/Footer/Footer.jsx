import React from "react";
import styles from "./Footer.module.css";

const Footer = (props) => {
    return (
        <footer className={styles.attribution} data-theme={props.theme}>
            <p>
                Challenge by{" "}
                <a href="https://www.frontendmentor.io?ref=challenge">
                    Frontend Mentor.
                </a>{" "}
                Coded by{" "}
                <a href="https://github.com/olamide203">Olamide Atitebi</a>.
            </p>
        </footer>
    );
};

export default Footer;
