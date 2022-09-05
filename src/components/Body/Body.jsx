import React, { useContext } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Body.module.css";
const Body = (props) => {
    return (
        <Card>
            <div className={styles["card__body"]}>
                <Button data="7">7</Button>
                <Button data="8">8</Button>
                <Button data="9">9</Button>
                <Button version="delete">DEL</Button>
                <Button data="4">4</Button>
                <Button data="5">5</Button>
                <Button data="6">6</Button>
                <Button data="+">+</Button>
                <Button data="1">1</Button>
                <Button data="2">2</Button>
                <Button data="3">3</Button>
                <Button data="-">-</Button>
                <Button data=".">.</Button>
                <Button data="0">0</Button>
                <Button data="/">/</Button>
                <Button data="&#215;">&#215;</Button>
                <Button version="reset">RESET</Button>
                <Button version="calc" type="submit" form="display-form">
                    =
                </Button>
            </div>
        </Card>
    );
};

export default Body;
