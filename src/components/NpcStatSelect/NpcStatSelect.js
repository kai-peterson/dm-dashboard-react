import React from 'react';

const NpcStatSelect = (props) => {
    return (
        <div className="select-container">
            <select onChange={(event) => props.handleSelectChange(event, props.type)}>
                <option value={"Strength"} selected>Strength</option>
                <option value={"Dexterity"}>Dexterity</option>
                <option value={"Constitution"}>Constitution</option>
                <option value={"Intelligence"}>Intelligence</option>
                <option value={"Wisdom"}>Wisdom</option>
                <option value={"Charisma"}>Charisma</option>
                <option value={"Acrobatics"}>Acrobatics</option>
                <option value={"Animal Handling"}>Animal Handling</option>
                <option value={"Arcana"}>Arcana</option>
                <option value={"Athletics"}>Athletics</option>
                <option value={"Deception"}>Deception</option>
                <option value={"History"}>History</option>
                <option value={"Insight"}>Insight</option>
                <option value={"Intimidation"}>Intimidation</option>
                <option value={"Investigation"}>Investigation</option>
                <option value={"Medicine"}>Medicine</option>
                <option value={"Nature"}>Nature</option>
                <option value={"Perception"}>Perception</option>
                <option value={"Performance"}>Performance</option>
                <option value={"Persuasion"}>Persuasion</option>
                <option value={"Religion"}>Religion</option>
                <option value={"Sleight of Hand"}>Sleight of Hand</option>
                <option value={"Stealth"}>Stealth</option>
                <option value={"Survival"}>Survival</option>
            </select>
            <button onClick={props.handleAddSelection}>Add {props.type === 'prof' ? 'Proficiency' : 'Expertise'}</button>
        </div>
    )
}

export default NpcStatSelect
