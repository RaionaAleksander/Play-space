// Home.js
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { Link } from "react-router-dom";

const Home = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#EDC9AF";

        return () => {
            document.body.style.backgroundColor = "lightgray";
        }
    })

    return (
        <div className="startPage">
            <div className={styles.gamepadPosition}>
                <img 
                    alt="Gamepad-home"
                    src="/images/Gamepad_icon.png"
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
                            <img className={styles.marqueeimage} src="/images/Red_button.png" alt="red button game" />
                        </Link>
                        <Link to="/games/hero_clicker">
                            <img className={styles.marqueeimage} src="/images/Warrior_leveled.png" alt="warrior game" />
                        </Link>
                    </div>
                    <div className={styles.marqueetwo}>
                        <Link to="/games/tic-tac-toe">
                            <img className={styles.marqueeimage} src="/images/TicTacToe_active.png" alt="tic tac toe game" />
                        </Link>
                        <Link to="/games/snake">
                            <img className={styles.marqueeimage} src="/images/Snake_active.png" alt="snake game" />
                        </Link>
                    </div>
                    <div className={styles.marqueethree}>
                        <Link to="/games/button_clicker">
                            <img className={styles.marqueeimage} src="/images/Red_button.png" alt="red button game" />
                        </Link>
                        <Link to="/games/hero_clicker">
                            <img className={styles.marqueeimage} src="/images/Warrior_leveled.png" alt="warrior hero" />
                        </Link>
                    </div>
                    <div className={styles.marqueefour}>
                        <Link to="/games/tic-tac-toe">
                            <img className={styles.marqueeimage} src="/images/TicTacToe_active.png" alt="tic tac toe game" />
                        </Link>
                        <Link to="/games/snake">
                            <img className={styles.marqueeimage} src="/images/Snake_active.png" alt="snake game" />
                        </Link>
                    </div>
                </div>
                <div className={styles.divText}>
                    <hr />
                    <p>
                        You can find out more about us <Link to="/about_us">here</Link>, and contact us <Link to="/contact">here</Link>.
                    </p>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Home;