//HeroClicker.js
import React, { useState, useEffect, useRef } from 'react';

import styles from '../../resourses/css/HeroGame.module.css';

function formatNumber(number) {
    if (number >= 1.0e+18) {
        return (number / 1.0e+18).toFixed(2) + "Qi"; // quintillion
    } else if (number >= 1.0e+15) {
        return (number / 1.0e+15).toFixed(2) + "Q"; //quadrillion
    } else if (number >= 1.0e+12) {
        return (number / 1.0e+12).toFixed(2) + "T"; //trillion
    } else if (number >= 1.0e+9) {
        return (number / 1.0e+9).toFixed(2) + "B"; //billion
    } else if (number >= 1.0e+6) {
        return (number / 1.0e+6).toFixed(2) + "M"; //million
    } else if (number >= 1.0e+3) {
        return (number / 1.0e+3).toFixed(2) + "K"; //thousand
    } else {
        return number.toString();
    }
}

const HeroClicker = () => {
    useEffect(() => {
        document.body.style.backgroundImage = "url('/background/Dungeon_wall.png')";
        document.body.style.backgroundRepeat = "repeat";
        //document.body.style.backgroundColor = "gold";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundRepeat = "";
            //document.body.style.backgroundColor = "lightgray";
        }
    })

    //const [EXP, setEXP] = useState(0);
    const [GOLD, setGOLD] = useState(0);
    const [ExpMUL, setExpMultiple] = useState(1);
    const [GoldMUL, setGoldMultiple] = useState(1);

    const [LEVEL, setLEVEL] = useState(1);
    const [ExpLevel, setExpLevel] = useState(0);
    const [MaxExpLevel, setMaxExpLevel] = useState(500);

    const [isLeveled, setIsLeveled] = useState(false);

    const [costOfGold, setCostOfGold] = useState(2);
    const [costOfExp, setCostOfExp] = useState(2);

    const goldMULRef = useRef(GoldMUL);
    const expMULRef = useRef(ExpMUL);
    const expLevelRef = useRef(ExpLevel);
    const maxExpLevelRef = useRef(MaxExpLevel);
    const LEVELRef = useRef(LEVEL);

    const [pause, setPause] = useState(true);
    const [win, setWin] = useState(false);

    useEffect(() => {
        goldMULRef.current = GoldMUL;
        expMULRef.current = ExpMUL;
        expLevelRef.current = ExpLevel;
        maxExpLevelRef.current = MaxExpLevel;
        LEVELRef.current = LEVEL;
    }, [GoldMUL, ExpMUL, ExpLevel, MaxExpLevel, LEVEL]);


    function handleClickG() {
        if (GOLD >= costOfGold) {
            setGoldMultiple(prev => Math.ceil(prev * 1.15));
            setCostOfGold(prev => Math.ceil(prev * 1.155));
            setGOLD(prev => prev - costOfGold);
        }
    }

    function handleClickE() {
        if (GOLD >= costOfExp) {
            setExpMultiple(prev => Math.ceil(prev * 1.15));
            setCostOfExp(prev => Math.ceil(prev * 1.155));
            setGOLD(prev => prev - costOfExp);
        }
    }

    function handleOnClickPaustStart() {
        setPause(!pause);
    }

    function handleOnClickRestart() {
        setGOLD(0);
        setExpMultiple(1);
        setGoldMultiple(1);
        setLEVEL(1);
        setExpLevel(0);
        setMaxExpLevel(500);
        setCostOfGold(2);
        setCostOfExp(2);
    }

    useEffect(() => {
        const interval = setInterval(() => { 
            if (pause || LEVELRef.current === 100) return;

            // Gold gain 3 per sec, Exp gain 2 per sec
            setGOLD(prevGOLD => prevGOLD + Math.ceil(3 * goldMULRef.current));

            let new_exp = Math.ceil(2 * expMULRef.current);
            //setEXP(prevEXP => prevEXP + new_exp);

            const now = LEVELRef.current;

            let lev = LEVELRef.current;
            let maxExp = maxExpLevelRef.current;
            let exp = expLevelRef.current + new_exp;
            
            while (exp >= maxExp){
                exp = exp - maxExpLevelRef.current;
                if (lev < 29) {
                    maxExp = maxExp + (lev * lev * 500);
                }
                else if (lev < 59) {
                    maxExp = maxExp + (lev * lev * 1000);
                }
                else if (lev < 69) {
                    maxExp = maxExp + (lev * lev * 1000000);
                }
                else if (lev < 79) {
                    maxExp = maxExp + (lev * lev * 1000000000);
                }
                else if (lev < 89) {
                    maxExp = maxExp + (lev * lev * 1000000000000);
                }
                else {
                    maxExp = maxExp + (lev * lev * 1000000000000000);
                }
                lev = lev + 1
            };

            if (lev >= 100) {
                setWin(true);
                setLEVEL(100);
                return;
            };

            setExpLevel(exp);
            if (lev > now) {
                setIsLeveled(true);
                setMaxExpLevel(maxExp)
                setLEVEL(lev);
            };
        }, 1000);
        return () => clearInterval(interval);
    }, [win, pause]);

    useEffect(() => {
        let timer;

        if (isLeveled) {
            timer = setTimeout(() => {
                setIsLeveled(false);
            }, 2000);
        }   

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isLeveled]);

    return (
      <div className="startPage">
        <div className={styles.heroContainer}>
            <h1 className={styles.heroName}>Hero Clicker</h1>
            <div className={styles.heroBorder}>
                <div className={styles.heroCanvas}>
                    <img src={(isLeveled) ? "/images/Warrior_leveled.png" : "/images/Warrior.png"} alt="Hero is warrior" className={styles.heroImage} />
                    <div className={styles.interfaceField}>
                        <h2>LEVEL: {LEVEL}</h2>
                        <p><b>Level progress: {(win) ? "-" : formatNumber(ExpLevel)} / {(win) ? "-" : formatNumber(MaxExpLevel)}</b></p>
                        <h3 className={styles.header}><i><u>Experience and gold multipliers</u></i></h3>
                        <p><b>Experience Multiplier: x{formatNumber(ExpMUL)}</b></p>
                        <p><b>Gold Multiplier: x{formatNumber(GoldMUL)}</b></p>
                        <h3 className={styles.header}><i><u>Gold and Costs</u></i></h3>
                        <p><b>Current Gold: {formatNumber(GOLD)} </b></p>
                        <div className={styles.buttonsField}>
                            <div className={styles.upgradeField}>
                                <img onClick={handleClickG} className={styles.smallButton} src={(GOLD < costOfGold) ? "/images/Gold_button_locked.png" : "/images/Gold_button.png"} alt="Gold button" />
                                <p><b>Upgrade: {formatNumber(costOfGold)}</b></p>
                            </div>
                            <div className={styles.upgradeField}>
                                <img onClick={handleClickE} className={styles.smallButton} src={(GOLD < costOfExp) ? "/images/Exp_button_locked.png" : "/images/Exp_button.png"} alt="Exp button" />
                                <p><b>Upgrade: {formatNumber(costOfExp)}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {win && <p class="winText"><b>You win!</b></p>}
            <div className={styles.buttonsContainer}>
                <button className={styles.heroButton + ' ' + styles.pauseStart} onClick={handleOnClickPaustStart}
                    style={{backgroundColor: (pause ? ("lightgreen") : ("lightcoral"))}}>
                    {pause ? ("Start") : ("Pause")}
                    {pause ? (
                        <img width="14px" style={{marginLeft: "6px"}} src="/images/startButton.png" alt="Start"></img>
                    ) : (
                        <img width="14px" style={{marginLeft: "6px"}} src="/images/stopButton.png" alt="Stop"></img>
                    )}
                </button>
                <button className={styles.heroButton + ' ' + styles.restart} onClick={handleOnClickRestart}>
                    Restart
                    <img width="14px" style={{marginLeft: "6px"}} src="/images/restartButton.png" alt="Restart"></img>
                </button>
            </div>
        </div>
      </div>
    );
};

export default HeroClicker;