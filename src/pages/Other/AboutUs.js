// AboutUs.js
import React from 'react';
import { useEffect } from 'react';

import styles from '../../resourses/css/AboutUs.module.css';

const AboutUs = () => {
    useEffect(() => {
        document.body.style.backgroundImage = "url('/background/Room_wall.png')";
        document.body.style.backgroundRepeat = "repeat";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundRepeat = "";
        }
    })

    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("en-US", {month: "long"});
    const year = currentDate.getFullYear();

    return (
        <div className="startPage">
            <h1>About Us</h1>
            <div className={styles.aboutUsPosition}>
                <div className={styles.informationFiled}>
                    <div className={styles.divText}>
                        <h3>Welcome to my project!</h3>
                        <p>
                            My name is <b>Aleksander Ontin</b>, and I am passionate about web development. 
                            The project, which is called <b>Play space</b>, was created and developed by me.
                        </p>
                        <p>This project was created using the <b>React</b> framework as part of my journey to learn and master it.</p>
                        <p>The creation of the project started along with learning React on June 24, 2024 and its refinement probably continues until the current time, {month} {day}, {year}.</p>
                        <p>The project repository can be found <a rel="noreferrer" target="_blank" href="https://github.com/RaionaAleksander/Play-space">here</a> on the <b>GitHub</b> platform.</p>

                    </div>
                    <img className={styles.reactImage} src="/images/React-icon.svg.png" alt="react ison" />
                    <div className={styles.divText}>
                        <p>
                            <b>React</b> <i>{'('}also known as React.js or ReactJS{')'}</i> is a free and open-source front-end JavaScript library for building user interfaces based on components.
                            Information about it can be found 
                            in the <a rel="noreferrer" target="_blank" href="https://react.dev/">official site</a> and 
                            in the <a rel="noreferrer" target="_blank" href="https://www.w3schools.com/react/">W3schools tutorial</a>.
                        </p>
                    </div>
                    <img className={styles.heartImage} src="/images/Heart.png" alt="heart icon" />
                    <div className={styles.divText}>
                        <p>Thank you very much for visiting this project!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default AboutUs;