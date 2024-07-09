// Games.js
import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

import styles from '../resourses/css/Games.module.css';

import redButton from '../resourses/images/Red_button.png';
import redButton_active from '../resourses/images/Red_button_pressed.png';
import warrior from '../resourses/images/Warrior.png';
import warrior_active from '../resourses/images/Warrior_leveled.png';
import ticTacToe from '../resourses/images/TicTacToe.png';
import tacTavToe_active from '../resourses/images/TicTacToe_active.png';
import snake from '../resourses/images/Snake.png';
import snake_active from '../resourses/images/Snake_active.png';


const Games = () => {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);

    function handleMouse(i) {
        if (i === 1) {
            setIsHovered1(!isHovered1);
        } else if (i === 2) {
            setIsHovered2(!isHovered2);
        } else if (i === 3) {
            setIsHovered3(!isHovered3);
        } else {
            setIsHovered4(!isHovered4)
        }
    }

    return (
        <div class="startPage">
            <h1 class="gameText">Games</h1>
            <p><u><b>This page contains a list of various games:</b></u></p>

            <div className={styles.gameContainer} style={{backgroundColor: "lightblue"}} 
                onMouseEnter={() => handleMouse(1)} onMouseLeave={() => handleMouse(1)}
            >
                <div className={styles.imageContainer}>
                    <img alt="The first game" src={isHovered1 ? redButton_active : redButton} className={styles.imageItem}></img>
                </div>
                <div className={styles.textContainer}>
                    <h2>Button Clicker</h2>
                    <p className={styles.textItem}>
                        In order for you to win, you must press the red button 1000 times. 
                        Hmm... don't tell me you didn't want to press the round red button once. 
                        Don't worry, you can do it here.
                    </p>
                    <Link className={styles.buttonItem} to="/games/button_clicker">Play the game</Link>
                </div>
            </div>

            <div className={styles.gameContainer} style={{backgroundColor: "lightgoldenrodyellow"}} 
                onMouseEnter={() => handleMouse(2)} onMouseLeave={() => handleMouse(2)}
            >
                <div className={styles.imageContainer}>
                    <img alt="The second game" src={isHovered2 ? warrior_active : warrior} className={styles.imageItem}></img>
                </div>
                <div className={styles.textContainer}>
                    <h2>Hero Clicker</h2>
                    <p className={styles.textItem}>
                    You are a warrior hero and are made to fight various monsters in the dungeon.
                    Increase your experience per battle to reach your cherished goal. 
                    To do this, click on the "+EXP" button.
                    Unfortunately, experience costs gold.
                    You also get gold for every fight and to increase it, click on the "+GOLD" button.
                    Reach level 100 and then pass the game!
                    </p>
                    <Link className={styles.buttonItem} to="/games/hero_clicker">Play the game</Link>
                </div>
            </div>

            <div className={styles.gameContainer} style={{backgroundColor: "lightcoral"}} 
                onMouseEnter={() => handleMouse(3)} onMouseLeave={() => handleMouse(3)}
            >
                <div className={styles.imageContainer}>
                    <img alt="The third game" src={isHovered3 ? tacTavToe_active : ticTacToe} className={styles.imageItem}></img>
                </div>
                <div className={styles.textContainer}>
                    <h2>Tic Tac Toe</h2>
                    <p className={styles.textItem}>
                    <b>Tic Tac Toe</b> is a two-player game in which the objective is to take turns and mark the correct spaces in a 3x3 (or larger) grid.
                    Think on your feet but also be careful, as the first player who places three of their marks in a horizontal, vertical or diagonal row wins the game!
                    How many rounds in a row can you win?
                    </p>
                    <Link className={styles.buttonItem} to="/games/tic-tac-toe">Play the game</Link>
                </div>
            </div>

            <div className={styles.gameContainer} style={{backgroundColor: "lightgreen"}} 
                onMouseEnter={() => handleMouse(4)} onMouseLeave={() => handleMouse(4)}
            >
                <div className={styles.imageContainer}>
                    <img alt="The fourth game" src={isHovered4 ? snake_active : snake} className={styles.imageItem}></img>
                </div>
                <div className={styles.textContainer}>
                    <h2>Snake</h2>
                    <p className={styles.textItem}>
                    <b>Snake</b> is a genre of action video games where the player maneuvers the end of a growing line, often themed as a snake.
                    The player must keep the snake from colliding with both other obstacles and itself, which gets harder as the snake lengthens.
                    </p>
                    <Link className={styles.buttonItem} to="/games/snake">Play the game</Link>
                </div>
            </div>
        </div>
    );
};
  
export default Games;