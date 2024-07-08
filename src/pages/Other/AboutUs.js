// AboutUs.js
import React from 'react';
import { useEffect } from 'react';

import styles from '../../resourses/css/AboutUs.module.css';

import Wall from '../../resourses/background/Room_wall.png';

import Heart from '../../resourses/images/Heart.png';
import React_icon from '../../resourses/images/React-icon.svg.png';

const AboutUs = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${Wall})`;
        document.body.style.backgroundRepeat = "repeat";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundRepeat = "";
        }
    })

    return (
        <div class="startPage">
            <h1>About Us</h1>
            <div className={styles.aboutUsPosition}>
                <div className={styles.informationFiled}>
                    <div className={styles.divText}>
                        <h3>Welcome to my project!</h3>
                        <p>
                            My name is <b>Aleksander Ontin</b>, and I am passionate about web development. 
                            The project, which is called <b>Play space</b>, was created and developed by me.
                        </p>
                        <p>The project repository can be found here.</p>
                        <p>This project was created using the React framework as part of my journey to learn and master it.</p>
                    </div>
                    <img className={styles.reactImage} src={React_icon} alt="react ison" />
                    <div className={styles.divText}>
                        <p>
                            <b>React</b> <i>{'('}also known as React.js or ReactJS{')'}</i> is a free and open-source front-end JavaScript library for building user interfaces based on components.
                            Information about it can be found 
                            in the <a rel="noreferrer" target="_blank" href="https://react.dev/">official site</a> and 
                            in the <a rel="noreferrer" target="_blank" href="https://www.w3schools.com/react/">W3schools tutorial</a>.
                        </p>
                    </div>
                    <img className={styles.heartImage} src={Heart} alt="heart icon" />
                    <div className={styles.divText}>
                        <p>Thank you very much for visiting this project!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default AboutUs;