import React from 'react';
import './NpcStatsForm.css';

const NpcStatsForm = () => {
    return (
        <>
        <h1 style={{'textAlign': 'center'}}>Skills</h1>
        <div className="npc-stats-form-container">
            <div className="npc-stats-form-container__skills-column">
                <div>
                    <h2>Health</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Speed</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Armor Class</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Strength</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Dexterity</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Constitution</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Intelligence</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Wisdom</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <h1>Add Proficiency</h1>
                <select>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                    <option>Strength</option>
                </select>
            </div>
            <div className="npc-stats-form-container__skills-column">
                {/* <h1>Proficient?</h1>
                <div>
                    <label for="proficient">YES</label>
                    <input name="isProficient" id="proficient" value="true" type="checkbox" />
                </div> */}
                <div>
                    <h2>Acrobatics</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Animal Handling</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Arcana</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Athletics</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Deception</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>History</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Insight</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Intimidation</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Investigation</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Medicine</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Nature</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Perception</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Performance</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Persuasion</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Religion</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Sleight of Hand</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Stealth</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
                <div>
                    <h2>Survival</h2>
                    <input type="number" placeholder="0 - 20" />
                </div>
            </div>
        </div>
        </>
    )
}

export default NpcStatsForm
