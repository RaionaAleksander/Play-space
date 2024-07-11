// Snake.js
import React, { useState, useEffect, useRef } from 'react';

import styles from '../../resourses/css/Snake.module.css';

import Start from '../../resourses/images/startButton.png';
import Stop from '../../resourses/images/stopButton.png';
import Restart from '../../resourses/images/restartButton.png';
import Settings from '../../resourses/images/settingsButton.png';

const Snake = () => {
    ////////
    // Settings
    const [snakeColor, setSnakeColor] = useState("green")
    const [foodColor, setFoodColor] = useState("red");
    const [fieldColor, setFieldColor] = useState("black");

    const [selectedOptionSnakeColor, setSelectedOptionSnakeColor] = useState("green");

    const handleSelectChangeSnakeColor = (event) => {
        setSelectedOptionSnakeColor(event.target.value);
    };

    const [selectedOptionFoodColor, setSelectedOptionFoodColor] = useState("red");

    const handleSelectChangeFoodColor = (event) => {
        setSelectedOptionFoodColor(event.target.value);
    };

    const [selectedOptionFieldColor, setSelectedOptionFieldColor] = useState("black");

    const handleSelectChangeFieldColor = (event) => {
        setSelectedOptionFieldColor(event.target.value);
    };

    function applyChanges() {
        setSnakeColor(selectedOptionSnakeColor);
        setFoodColor(selectedOptionFoodColor);
        setFieldColor(selectedOptionFieldColor);

        handleOnClickRestart();
        setSettingsOpen(false);
    }

    //////////


    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 0, y: 9 }]);
    const [food, setFood] = useState({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
    const [direction, setDirection] = useState("right");
    const [settingsOpen, setSettingsOpen] = useState(false);

    const [score, setScore] = useState(0);

    const [pause, setPause] = useState(true);
    const [win, setWin] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.keyCode) {
                case 37: // ArrowLeft
                    if (pause === false && direction !== "right") setDirection("left");
                    break;
                case 38: // ArrowUp
                    if (pause === false && direction !== "down") setDirection("up");
                    break;
                case 39: // ArrowRight
                    if (pause === false && direction !== "left") setDirection("right");
                    break;
                case 40: // ArrowDown
                    if (pause === false && direction !== "up") setDirection("down");
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction, pause]);

    useEffect(() => {
        if (pause) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawSnake = () => {
            ctx.fillStyle = snakeColor;
            snake.forEach(part => {
                ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
            });
        };

        const drawFood = () => {
            ctx.fillStyle = foodColor;
            ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
        };

        const drawScore = () => {
            if (fieldColor === "black") {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.fillText("SCORE: " + score, 10, canvas.height-10)
        }

        const moveSnake = () => {
            const newSnake = [...snake];
            const head = { ...newSnake[0] };

            if (direction === "left") head.x -= 1;
            if (direction === "right") head.x += 1;
            if (direction === "up") head.y -= 1;
            if (direction === "down") head.y += 1;
            
            newSnake.unshift(head);

            if (snake.length === 20 * 20) {
                setWin(true);
                setPause(true);
                return;
            }

            if (head.x === food.x && head.y === food.y) {
                let newFoodPosition = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };

                while (isFoodOnSnake(newSnake, newFoodPosition)) {
                    newFoodPosition = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
                }

                setFood(newFoodPosition);
                setScore(prev => prev + 1);
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);

            if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || newSnake.slice(1).some(part => part.x === head.x && part.y === head.y)) {
                setScore(0);
                setSnake([{ x: 0, y: 9 }]);
                setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
                setDirection("right");
            }
        };

        const isFoodOnSnake = (snake, foodPosition) => {
            return snake.some(part => part.x === foodPosition.x && part.y === foodPosition.y);
        };

        const gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSnake();
            drawFood();
            drawScore();
            moveSnake();
        };

        const interval = setInterval(gameLoop, 100);

        return () => clearInterval(interval);
    }, [snake, food, direction, pause, score, snakeColor, fieldColor, foodColor]);

    function handleOnClickPaustStart() {
        setPause(!pause);
    }

    function handleOnClickRestart() {
        setPause(false);
        setScore(0);
        setSnake([{ x: 0, y: 9 }]);
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        setDirection("right");
    }

    function handleOnClickSettings() {
        setSettingsOpen(!settingsOpen);
    }

    function handleOnClickLeft() { // ButtonLeft
        if (pause === false && direction !== "right") setDirection("left");
    }

    function handleOnClickRight() { // ButtonRight
        if (pause === false && direction !== "left") setDirection("right");
    }

    function handleOnClickUp() { // ButtonUp
        if (pause === false && direction !== "down") setDirection("up");
    }

    function handleOnClickDown() { // ButtonDown
        if (pause === false && direction !== "up") setDirection("down");
    }

    function handleOnClickMiddle() { // ButtonMiddle
        console.log("The button in the middle of the controller does nothing!!!")
    }

    return (
        <div className="startPage">
            <div className={styles.snakeContainer}>
                <h1 className="snakeGame">The Snake game</h1>
                <div className={styles.snakeBorder}>
                    <canvas ref={canvasRef} id="game" width="400" height="400" className={styles.snakeCanvas} style={{backgroundColor: fieldColor}}></canvas>
                </div>
                {win && <p className="winText"><b>You win!</b></p>}

                {/* CONTROLLER*/}
                <div className={styles.controller}>
                    <button onClick={handleOnClickUp} className={styles.buttonUP}>▲</button>
                    <div className={styles.buttonMIDDLE}>
                        <button onClick={handleOnClickLeft} className={styles.buttonLEFT}>◄</button>
                        <button onClick={handleOnClickMiddle} className={styles.buttonCENTER}>○</button>
                        <button onClick={handleOnClickRight} className={styles.buttonRIGHT}>►</button>
                    </div>
                    <button onClick={handleOnClickDown} className={styles.buttonDOWN}>▼</button>
                </div>

                {/* START/RESTART/SETTINGS */}
                <div className={styles.buttonsContainer}>
                    <button className={styles.snakeButton + ' ' + styles.pauseStart} onClick={handleOnClickPaustStart}
                    style={{backgroundColor: (pause ? ("lightgreen") : ("lightcoral"))}}>
                        {pause ? ("Start") : ("Pause")}
                        {pause ? (
                            <img width="14px" style={{marginLeft: "6px"}} src={Start} alt="Start"></img>
                        ) : (
                            <img width="14px" style={{marginLeft: "6px"}} src={Stop} alt="Stop"></img>
                        )}
                    </button>
                    <button className={styles.snakeButton + ' ' + styles.restart} onClick={handleOnClickRestart} >
                        Restart
                        <img width="14px" style={{marginLeft: "6px"}} src={Restart} alt="Restart"></img>
                    </button>
                    <button className={styles.snakeButton + ' ' + styles.settings} onClick={handleOnClickSettings}>
                        Settings
                        <img width="16px" style={{marginLeft: "6px"}} src={Settings} alt="Restart"></img>
                    </button> 
                </div>
            </div>

            {/* SETTINGS */}
            <div className={styles.overlayPanel} style={{display: (settingsOpen ? ("block") : ("none"))}}>
                <h3>The game settings</h3>
                <div className={styles.overlayContainer}>
                    <label className={styles.overlayLabel}>
                        The Snake color:
                        <select style={{marginLeft: "4px"}} value={selectedOptionSnakeColor} onChange={handleSelectChangeSnakeColor}>
                            <option value="green">Green</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                        </select>
                    </label>
                    <label className={styles.overlayLabel}>
                        The Food color:
                        <select style={{marginLeft: "4px"}} value={selectedOptionFoodColor} onChange={handleSelectChangeFoodColor}>
                            <option value="green">Green</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                        </select>
                    </label>
                    <label className={styles.overlayLabel}>
                        The Field color:
                        <select style={{marginLeft: "4px"}} value={selectedOptionFieldColor} onChange={handleSelectChangeFieldColor}>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                        </select>
                    </label>
                    <div className={styles.applyButtonContainer}>
                        <button className={styles.applyButton} onClick={applyChanges}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default Snake;