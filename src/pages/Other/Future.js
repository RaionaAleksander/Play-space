// Future.js
import React, {useState, useEffect, createContext} from 'react';
import Component2 from '../Future_conponents/Component2'; 
import styles from '../../resourses/css/Future.module.css';

export const UserContext = createContext();

const Future = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "white";

        return () => {
            document.body.style.backgroundColor = "lightgray";
        }
    })

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const toggleCase = (str) => {
        return str.split('').map(char => {
            if (char === char.toLowerCase()) {
                return char.toUpperCase();
            } else {
                return char.toLowerCase();
            }
        }).join('');
    }

    const subject = [
        { title: "Programmeerimine", EN: "Computer Programming", EAP: "6", id: 1},
        { title: "Veebilehtede loomine", EN: "Creating WWW Pages", EAP: "3", id: 2},
        { title: "Veebilehtede loomine edasijõudnutele", EN: "Web Page Creation For Advanced Users", EAP: "3", id: 3},
        { title: "Veebirakenduse loomine", EN: "Web Application Development", EAP: "6", id: 4},
    ];

    return (
        <div class="startPage">
            <h1>Timer and components</h1>

            <h2 style={{textAlign: "center"}}>Timer: now is {seconds} seconds!</h2>

            <div style={{padding: "20px", border: "2px solid black"}}>
                <UserContext.Provider value={seconds}>
                    <h2>Here is {seconds} seconds!</h2>
                    <Component2 />
                </UserContext.Provider>
            </div>
            <h2 style={{textAlign: 'center'}}>Table: Subjects</h2>
            <div style={{padding: "10px"}}>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>Title (EST)</th>
                            <th>Title (EN)</th>
                            <th>EAP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.EN}</td>
                                <td>{item.EAP}</td>
                            </tr>
                        ))}
                    </tbody>          
                </table>
            </div>
            <h2>{toggleCase("Toggle text!")}</h2>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", margin: "50px"}}>
                <div style={{marginBottom: "10px"}}>
                    {'"'}
                    {text.split("").map((char, index) => (
                        <span key={index}>{toggleCase(char)}</span>
                    ))}
                    {'"'}
                </div>
                <input
                    className={styles.toggleInput}
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Enter text here..."
                />
            </div>
        </div>
    );
};
  
export default Future;