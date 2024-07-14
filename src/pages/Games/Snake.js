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
    const [fieldSize, setFieldSize] = useState(360);
    const [cells, setCells] = useState(20);
    const [isDisplay, setIsDisplay] = useState(true);
    const [isBoundary, setIsBoundary] = useState(false);

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

    const [selectedOptionFieldSize, setSelectedOptionFieldSize] = useState(360);

    const handleSelectChangeFieldSize = (event) => {
        setSelectedOptionFieldSize(event.target.value);
    };

    const [selectedOptionCells, setSelectedOptionCells] = useState(20);

    const handleSelectChangeCells = (event) => {
        setSelectedOptionCells(event.target.value);
    };

    const [checkedDisplay, setCheckedDisplay] = useState(true);

    const handleCheckboxChangeDisplay = (event) => {
        setCheckedDisplay(event.target.checked);
    };

    const [checkedBoundary, setCheckedBoundary] = useState(false);

    const handleCheckboxChangeBoundary = (event) => {
        setCheckedBoundary(event.target.checked);
    };

    function applyChanges() {
        setSnakeColor(selectedOptionSnakeColor);
        setFoodColor(selectedOptionFoodColor);
        setFieldColor(selectedOptionFieldColor);
        setFieldSize(selectedOptionFieldSize);
        setCells(selectedOptionCells);
        setIsDisplay(checkedDisplay);
        setIsBoundary(checkedBoundary);

        setSettingsOpen(false);
        handleOnClickRestart();
    }

    //////////

    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 0, y: Math.floor(cells/2) }]);
    const [food, setFood] = useState({ x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells) });
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
        const cellsSize = fieldSize/cells;

        const drawSnake = () => {
            ctx.fillStyle = snakeColor;
            snake.forEach(part => {
                ctx.fillRect(part.x * cellsSize, part.y * cellsSize, cellsSize, cellsSize);
            });
        };

        const drawFood = () => {
            ctx.fillStyle = foodColor;
            ctx.fillRect(food.x * cellsSize, food.y * cellsSize, cellsSize, cellsSize);
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

            console.log(snake.length);

            if (snake.length === cells * cells) {
                setWin(true);
                setPause(true);
                return;
            }

            if (isBoundary) {
                if (head.x < 0) head.x = cells - 1;
                else if (head.x >= cells) head.x = 0;
                else if (head.y < 0) head.y = cells - 1;
                else if (head.y >= cells) head.y = 0;
            }

            if (head.x === food.x && head.y === food.y) {
                let newFoodPosition = { x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells) };

                while (isFoodOnSnake(newSnake, newFoodPosition)) {
                    newFoodPosition = { x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells) };
                }

                setFood(newFoodPosition);
                setScore(prev => prev + 1);
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);

            if (head.x < 0 || head.x >= cells || head.y < 0 || head.y >= cells || newSnake.slice(1).some(part => part.x === head.x && part.y === head.y)) {
                setScore(0);
                setSnake([{ x: 0, y: Math.floor(cells/2) }]);
                setFood({ x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells) });
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

        const interval = setInterval(gameLoop, 125);

        return () => clearInterval(interval);
    }, [snake, food, direction, pause, score, snakeColor, fieldColor, foodColor, cells, fieldSize, isBoundary]);

    function handleOnClickPaustStart() {
        setPause(!pause);
    }

    function handleOnClickRestart() {
        setPause(false);
        setScore(0);
        setDirection("right");
        setSnake([{ x: 0, y: Math.floor(cells/2) }]);
        setFood({ x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells)});
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
                    <canvas ref={canvasRef} id="game" width={fieldSize} height={fieldSize} className={styles.snakeCanvas} style={{backgroundColor: fieldColor}}></canvas>
                </div>
                {win && <p className="winText"><b>You win!</b></p>}

                {/* CONTROLLER*/}
                {isDisplay &&
                <div className={styles.controller}>
                    <button onClick={handleOnClickUp} className={styles.buttonUP}>▲</button>
                    <div className={styles.buttonMIDDLE}>
                        <button onClick={handleOnClickLeft} className={styles.buttonLEFT}>◄</button>
                        <button onClick={handleOnClickMiddle} className={styles.buttonCENTER}>○</button>
                        <button onClick={handleOnClickRight} className={styles.buttonRIGHT}>►</button>
                    </div>
                    <button onClick={handleOnClickDown} className={styles.buttonDOWN}>▼</button>
                </div>}

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
                    <label className={styles.overlayLabel + " " + styles.overlayLabelDisable}>
                        The Field size:
                        <select style={{marginLeft: "4px"}} value={selectedOptionFieldSize} onChange={handleSelectChangeFieldSize}>
                            <option value="360">360x360</option>
                            <option value="400">400x400</option>
                            <option value="440">440x440</option>
                            <option value="500">500x500</option>
                        </select>
                    </label>
                    <label className={styles.overlayLabel}>
                        The Cells number:
                        <select style={{marginLeft: "4px"}} value={selectedOptionCells} onChange={handleSelectChangeCells}>
                            <option value="10">10x10</option>
                            <option value="20" selected>20x20</option>
                            <option value="30">30x30</option>
                            <option value="40">40x40</option>
                        </select>
                    </label>
                    <label className={styles.overlayLabel + " " + styles.overlayLabelDisable}>
                        <input
                        type="checkbox"
                        checked={checkedDisplay}
                        onChange={handleCheckboxChangeDisplay}
                        />
                        Display the controller
                    </label>
                    <label className={styles.overlayLabel}>
                        <input
                        type="checkbox"
                        checked={checkedBoundary}
                        onChange={handleCheckboxChangeBoundary}
                        />
                        Disable the border
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