// Contact.js
import React from 'react';
import { useEffect } from 'react';

import Wall from '../../resourses/background/Metal_wall.png';

const Contact = () => {
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
            <h1>Contact Us</h1>
            <div style={{marginTop: "30px"}}>
                <p><b>Address</b>: aleksander.ontin@gmail.com</p>
                <p><b>LinkedIn</b>: <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/aleksander-ontin-818162310/">https://www.linkedin.com/in/aleksander-ontin-818162310/</a></p>
            </div>
        </div>
    );
};

export default Contact;