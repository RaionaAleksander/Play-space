//ButtonClicker.js
import React, { useState, useEffect } from 'react';
import RedButton from '../../resourses/images/Red_button.png';
import RedButtonPr from '../../resourses/images/Red_button_pressed.png';
import styles from '../../resourses/css/ButtonGame.module.css';

import Restart from '../../resourses/images/restartButton.png';

const ButtonClicker = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "lightblue";

        return () => {
            document.body.style.backgroundColor = "lightgray";
        }
    })

    const [clicks, setClicks] = useState(0);
    const [isPressed, setIsPressed] = useState(false);
    const [pressCounter, setPressCounter] = useState(0);

    const [win, setWin] = useState(false);

    function handleClick() {
        let help = clicks + 1;
        setClicks(help);
        if (help >= 1000) setWin(true);
    }

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        setPressCounter(0)
    };

    useEffect(() => {
        let interval = null;
        if (isPressed) {
            interval = setInterval(() => {
                setPressCounter((pressCounter) => pressCounter + 1);
            }, 1000);
        } else if (!isPressed && pressCounter !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPressed, pressCounter]);

    const checkSec1 = () => {
        if (pressCounter >= 5) return "You hold the button for " + pressCounter + " seconds!";
        return "";
    }

    const checkSec2 = () => {
        if (pressCounter >= 60) return "Wow!!!";
        return "";
    }

    function handleOnClickRestart() {
        setClicks(0);
    }

    return (
      <div class="startPage">
        <h1>Button Clicker</h1>
        <div className={styles.buttonContainer}>
            <h2>"The button was clicked {clicks} times!"</h2>
            <div className={styles.redButton}>
                <img 
                        onClick={handleClick}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className={styles.imageButton}
                        src={isPressed ? RedButtonPr : RedButton}
                        alt="This is red button"
                />
            </div>
            {win && <p class="winText"><b>You win!</b></p>}
            <button className={styles.buttonButton + ' ' + styles.restart} onClick={handleOnClickRestart}>
                Restart
                <img width="14px" style={{marginLeft: "6px"}} src={Restart} alt="Restart"></img>
            </button>
            <h3>{checkSec1()}</h3>
            <h3 className={styles.wowText}>{checkSec2()}</h3>
        </div>
      </div>
    );
};

export default ButtonClicker;
