// Navbar.js
import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

import styles from '../../styles/Navbar.module.css';

const Navbar = ({ toggleSidebar }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    
    return (
        <>
            <div className={styles.navBarMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={styles.menuContainer}>
                    <div className={styles.buttonsContainer}>
                        <Link className={styles.buttonItem} to="/">Home</Link>
                        <div className={styles.dropdownItem}>
                            <Link className={styles.dropdownButton} to="/games/">Games</Link>
                            <div className={styles.dropdownContent}>
                                <Link className={styles.dropdownContentButton} to="/games/button_clicker">Button Clicker</Link>
                                <Link className={styles.dropdownContentButton} to="/games/hero_clicker">Hero Clicker</Link>
                                <Link className={styles.dropdownContentButton} to="/games/tic-tac-toe">Tic Tac Toe</Link>
                                <Link className={styles.dropdownContentButton} to="/games/snake">Snake</Link>
                            </div>
                        </div>
                        <Link className={styles.buttonItem} to="/blogs">Blogs</Link>
                        <div className={styles.dropdownItem}>
                            <span className={styles.dropdownButtonNotUse}>Other</span>
                            <div className={styles.dropdownContent}>
                                <Link className={styles.dropdownContentButton} to="/about_us">About Us</Link>
                                <Link className={styles.dropdownContentButton} to="/future">Interesting</Link>
                                <Link className={styles.dropdownContentButton} to="/contact">Contact Us</Link>
                            </div>
                        </div>
                        <button className={styles.sideButton} onClick={toggleSidebar}>
                            <div className={styles.burgerMenu}>
                                <div className={styles.rectangle}></div>
                                <div className={styles.rectangle}></div>
                                <div className={styles.rectangle}></div>
                            </div>
                        </button>
                    </div>
                    <div className={styles.imageContainer}>
                        <img alt="Gamepad icon" src={isHovered ? "/images/Gamepad_icon_active.png" : "/images/Gamepad_icon.png"} className={styles.imageIcon}></img>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Navbar;