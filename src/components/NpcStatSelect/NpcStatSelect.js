import React from 'react';

const NpcStatSelect = (props) => {
    return (
        <div className="select-container">
            <select onChange={(event) => props.handleSelectChange(event, props.type)}>
                <option value={["Strength"]} selected>Strength</option>
                <option value={["Dexterity"]}>Dexterity</option>
                <option value={["Constitution"]}>Constitution</option>
                <option value={["Intelligence"]}>Intelligence</option>
                <option value={["Wisdom"]}>Wisdom</option>
                <option value={["Charisma"]}>Charisma</option>
                <option value={["Acrobatics", 'Dexterity']}>Acrobatics</option>
                <option value={["Animal Handling", 'Wisdom']}>Animal Handling</option>
                <option value={["Arcana", 'Intelligence']}>Arcana</option>
                <option value={["Athletics", "Strength"]}>Athletics</option>
                <option value={["Deception", "Charisma"]}>Deception</option>
                <option value={["History", 'Intelligence']}>History</option>
                <option value={["Insight", 'Wisdom']}>Insight</option>
                <option value={["Intimidation", "Charisma"]}>Intimidation</option>
                <option value={["Investigation", 'Intelligence']}>Investigation</option>
                <option value={["Medicine", 'Wisdom']}>Medicine</option>
                <option value={["Nature", 'Intelligence']}>Nature</option>
                <option value={["Perception", 'Wisdom']}>Perception</option>
                <option value={["Performance", "Charisma"]}>Performance</option>
                <option value={["Persuasion", "Charisma"]}>Persuasion</option>
                <option value={["Religion", 'Intelligence']}>Religion</option>
                <option value={["Sleight of Hand", 'Dexterity']}>Sleight of Hand</option>
                <option value={["Stealth", 'Dexterity']}>Stealth</option>
                <option value={["Survival", 'Wisdom']}>Survival</option>
            </select>
            <button onClick={props.handleAddSelection}>Add {props.type === 'prof' ? 'Proficiency' : 'Expertise'}</button>
        </div>
    )
}

export default NpcStatSelect
