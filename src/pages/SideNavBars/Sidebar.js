import React from 'react';
import { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

import styles from '../../resourses/css/Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar();
            };
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleSidebar]);

    return (
        <div ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeButton} onClick={toggleSidebar} >
                <div className={styles.burgerMenu}>
                    <div className={styles.rectangle}></div>
                    <div className={styles.rectangle}></div>
                    <div className={styles.rectangle}></div>
                </div>
            </button>
            <div className={styles.sidebarMenu}>
                <Link className={styles.buttonItem + ' ' + styles.borderDown} to="/">
                    <span className={styles.buttonText} >Home</span>
                </Link>
                <Link className={styles.buttonItem + ' ' + styles.borderDown + ' ' + styles.brAfter} to="/games/">
                    <span className={styles.buttonText} >Games</span>
                </Link>
                <Link className={styles.buttonItem + ' ' + styles.borderUp + ' ' + styles.borderDown} to="/blogs">
                    <span className={styles.buttonText} >Blogs</span>
                </Link>
                <Link className={styles.buttonItem + ' ' + styles.borderDown  + ' ' + styles.brAfter} to="/future">
                    <span className={styles.buttonText} >Interesting</span>
                </Link>
                <Link className={styles.buttonItem + ' ' + styles.borderUp + ' ' + styles.borderDown} to="/about_us">
                    <span className={styles.buttonText} >About Us</span>
                </Link>
                <Link className={styles.buttonItem + ' ' + styles.borderDown} to="/contact">
                    <span className={styles.buttonText} >Contact Us</span>
                </Link>
            </div>
        </div>
    );
};


export default Sidebar;