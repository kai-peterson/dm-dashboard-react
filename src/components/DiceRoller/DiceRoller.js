import React, { useState } from 'react';
import './DiceRoller.css';

function DiceRoller() {
    return (
        <div className="dice-roller-container">

            <div className="dice-container">
                <div>
                    <img src="/images/d4.png" />
                    <button>D4</button>
                </div>
                <div>
                    <img src="/images/d6.png" />
                    <button>D6</button>
                </div>
                <div>
                    <img src="/images/d8.png" />
                    <button>D8</button>
                </div>
                <div>
                    <img src="/images/d10.png" />
                    <button>D10</button>
                </div>
                <div>
                    <img src="/images/d12.png" />
                    <button>D12</button>
                </div>
                <div>
                    <img src="/images/d20.png" />
                    <button>D20</button>
                </div>
            </div>

        </div>
    )
}

export default DiceRoller;
