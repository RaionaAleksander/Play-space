// Home.js
import React, { useEffect } from 'react';
import styles from '../resourses/css/Home.module.css';
import { Link } from "react-router-dom";
 
import Gamepad from '../resourses/images/Gamepad_icon.png';

import RedButton from '../resourses/images/Red_button.png';
import Warrior from '../resourses/images/Warrior_leveled.png';
import TacTavToe from '../resourses/images/TicTacToe_active.png';
import Snake from '../resourses/images/Snake_active.png';


const Home = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#EDC9AF";

        return () => {
            document.body.style.backgroundColor = "lightgray";
        }
    })

    return (
        <div class="startPage">
            <div className={styles.gamepadPosition}>
                <img 
                    alt="Gamepad-home"
                    src={Gamepad}
                    style={{width: "32%"}}
                />
                <h1>"Play Space"</h1>
                <div className={styles.divText}>
                    <hr />
                    <p>Welcome to the <b>Play Space</b>!</p>
                    <p>
                    The <b>Play Space</b> is a website that provides a small number of small games for users. 
                    After a while new games will appear. 
                    You can play them at any convenient time on your computer.
                    </p>
                    <p>Have a good game{')'}</p>
                    <hr />
                </div>
                <hr />
                <h2>Our Games</h2>
                <div className={styles.marquee}>
                    <div className={styles.marqueeone}>
                        <Link to="/games/button_clicker">
                            <img className={styles.marqueeimage} src={RedButton} alt="red button game" />
                        </Link>
                        <Link to="/games/hero_clicker">
                            <img className={styles.marqueeimage} src={Warrior} alt="warrior game" />
                        </Link>
                    </div>
                    <div className={styles.marqueetwo}>
                        <Link to="/games/tic-tac-toe">
                            <img className={styles.marqueeimage} src={TacTavToe} alt="tic tac toe game" />
                        </Link>
                        <Link to="/games/snake">
                            <img className={styles.marqueeimage} src={Snake} alt="snake game" />
                        </Link>
                    </div>
                    <div className={styles.marqueethree}>
                        <Link to="/games/button_clicker">
                            <img className={styles.marqueeimage} src={RedButton} alt="red button game" />
                        </Link>
                        <Link to="/games/hero_clicker">
                            <img className={styles.marqueeimage} src={Warrior} alt="warrior hero" />
                        </Link>
                    </div>
                    <div className={styles.marqueefour}>
                        <Link to="/games/tic-tac-toe">
                            <img className={styles.marqueeimage} src={TacTavToe} alt="tic tac toe game" />
                        </Link>
                        <Link to="/games/snake">
                            <img className={styles.marqueeimage} src={Snake} alt="snake game" />
                        </Link>
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </div>
    );
}

export default Home;