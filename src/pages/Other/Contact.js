// Contact.js
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../resourses/css/Contact.module.css';

import Wall from '../../resourses/background/Metal_wall.png';

const CopyTextButton = ({ textToCopy, onCopy, buttonId, activeButton }) => {
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        if (activeButton !== buttonId) {
          setCopySuccess('');
        }
    }, [activeButton, buttonId]);
  
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopySuccess('Text copied successfully!');
        onCopy(buttonId);
      } catch (err) {
        setCopySuccess('Failed to copy text');
      }
    };
  
    return (
      <div className={styles.copyContainer}>
        <button className={styles.copyButton} onClick={copyToClipboard}>Copy Text</button>
        {copySuccess && <p>{copySuccess}</p>}
      </div>
    );
};

const Contact = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${Wall})`;
        document.body.style.backgroundRepeat = "repeat";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundRepeat = "";
        };
    });

    const [activeButton, setActiveButton] = useState(null);

    const handleCopy = (buttonId) => {
        setActiveButton(buttonId);
    };

    return (
        <div className="startPage">
            <h1>Contact Us</h1>
            <div style={{marginTop: "30px"}}>
                <p><b>Address</b>:</p>
                <p>aleksander.ontin@gmail.com</p>
                <CopyTextButton textToCopy="aleksander.ontin@gmail.com" onCopy={handleCopy} buttonId={1} activeButton={activeButton}/>
                <br />
                <p><b>LinkedIn</b>:</p>
                <p><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/aleksander-ontin-818162310/">https://www.linkedin.com/in/aleksander-ontin-818162310/</a></p>
                <CopyTextButton textToCopy="https://www.linkedin.com/in/aleksander-ontin-818162310/" onCopy={handleCopy} buttonId={2} activeButton={activeButton}/>
            </div>
        </div>
    );
};

export default Contact;