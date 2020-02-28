import React, { useState, useEffect } from 'react';
import './Calculator.css'
import axios from 'axios';
import querystring from 'querystring';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);

    useEffect( () => {
        axios.get('/calculations/history')
            .then((response) => {
                setHistory(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleClick = (num) => {
        setInput(input + num);
    }

    const handleCalc = () => {
        setInput('');
        axios.post('http://localhost:8080/calculations', querystring.parse(`equation=${input.replace('÷', '/')}`))
            .then((response) => {
                setHistory(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="calculator-container">
            <div className="calculator">
                <input disabled value={input} />
                <button onClick={() => handleClick('7')}>7</button>
                <button onClick={() => handleClick('8')}>8</button>
                <button onClick={() => handleClick('9')}>9</button>
                <button onClick={() => handleClick(' ÷ ')}>÷</button>
                <button onClick={() => handleClick('4')}>4</button>
                <button onClick={() => handleClick('5')}>5</button>
                <button onClick={() => handleClick('6')}>6</button>
                <button onClick={() => handleClick(' x ')}>x</button>
                <button onClick={() => handleClick('1')}>1</button>
                <button onClick={() => handleClick('2')}>2</button>
                <button onClick={() => handleClick('3')}>3</button>
                <button onClick={() => handleClick(' - ')}>-</button>
                <button className="bottom-left" onClick={() => handleClick('0')}>0</button>
                <button onClick={() => handleClick('.')}>.</button>
                <button onClick={handleCalc}>=</button>
                <button className="bottom-right" onClick={() => handleClick(' + ')}>+</button>
            </div>
            <div className="history-container">
                <h1>History</h1>
                {history[0] &&
                    history.map((calculation) =>
                        <ul>
                            <h2>{calculation.equation.replace('/', '÷') + " = " + calculation.result}</h2>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Calculator;