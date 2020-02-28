import React, { useState } from 'react';
import './DiceRoller.css';
import axios from 'axios';
import querystring from 'querystring';

function DiceRoller() {
    const [dice, setDice] = useState([]);
    const [rolls, setRolls] = useState([]);
    const [rollResult, setRollResult] = useState();
    const [fade, setFade] = useState();

    const addDie = (die) => {
        if (!fade) {
            setFade(true);
        }
        if (rolls[0]) {
            setDice([die])
            setRolls([]);
            setRollResult();
        } else {
            setDice([...dice, die]);
        }
    }

    const handleReset = () => {
        setFade(false)
        setTimeout(() => {
            setDice([]);
        }, 400)
    }

    const handleRoll = () => {
        axios.post('http://localhost:8080/rolls', querystring.parse(`rolls=${dice.join(' ')}`))
            .then( (response) => {
                // storing data in a weird way in db (a string but in array format)
                // following two lines just turn that string into an actual array
                let rolls = response.data.rolls;
                let rollsInArray = rolls.slice(1, rolls.length - 1).split(', ');
            
                setRolls(rollsInArray);
                setRollResult(response.data.result)
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    return (
        <div className="dice-roller-container">

            <div className="dice-container">
                <div>
                    <img src="/images/d4.png" alt="4-sided die icon" />
                    <button onClick={() => addDie('4')}>D4</button>
                </div>
                <div>
                    <img src="/images/d6.png" alt="6-sided die icon" />
                    <button onClick={() => addDie('6')}>D6</button>
                </div>
                <div>
                    <img src="/images/d8.png" alt="8-sided die icon" />
                    <button onClick={() => addDie('8')}>D8</button>
                </div>
                <div>
                    <img src="/images/d10.png" alt="10-sided die icon" />
                    <button onClick={() => addDie('10')}>D10</button>
                </div>
                <div>
                    <img src="/images/d12.png" alt="12-sided die icon" />
                    <button onClick={() => addDie('12')}>D12</button>
                </div>
                <div>
                    <img src="/images/d20.png" alt="20-sided die icon" />
                    <button onClick={() => addDie('20')}>D20</button>
                </div>
            </div>

                {dice[0] &&
                    <div className="dice-display-container">
                        <div className={`dice-display ${fade ? 'fade-in' : 'fade-out'}`}>
                            {dice.map((die) => <div><img src={`/images/d${die}.png`}/></div>)}
                        </div>
                        {rolls[0] && 
                            <div className={`rolls-display ${fade ? 'fade-in' : 'fade-out'}`}>
                                {rolls.map( (roll, i) => 
                                    i === rolls.length - 1 ?
                                    <><h2>{roll}</h2><h2>=</h2></> :
                                    <><h2>{roll}</h2><h2>+</h2></>
                                )}
                                <h1>{rollResult}</h1>
                            </div>
                        }
                        <div className={`dice-display-buttons ${fade ? 'fade-in' : 'fade-out'}`}>
                            <button onClick={handleRoll}>ROLL</button>
                            <button onClick={handleReset}>RESET</button>
                        </div>
                    </div>
                }

        </div >
    )
}

export default DiceRoller;
