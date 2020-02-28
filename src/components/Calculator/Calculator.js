import React, { useState } from 'react';
import './Calculator.css'

function Calculator() {
    return (
        <div className="calculator-container">
            <div className="calculator">
                <input />
                <button className="top-left">7</button>
                <button>8</button>
                <button>9</button>
                <button className="top-right">÷</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>x</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>-</button>
                <button className="bottom-left">0</button>
                <button>.</button>
                <button>=</button>
                <button className="bottom-right">+</button>
            </div>
            <div className="calc-history">
                <h1>History</h1>
            </div>
        </div>
    )
}

export default Calculator;