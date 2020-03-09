import React, { useState, useEffect } from 'react';
import './NpcStatsForm.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const npcSelector = (state) => state.npcReducer;

const NpcStatsForm = (props) => {
    const dispatch = useDispatch();
    const npcInfo = useSelector(npcSelector);

    const [stats, setStats] = useState({});
    const [proficiencies, setProficiencies] = useState({});
    const [bonuses, setBonuses] = useState({});

    const { name, level, character_class } = npcInfo;

    useEffect(() => {
        axios.get(`http://localhost:8080/npc/${props.match.params.npcId}`)
            .then((response) => {
                dispatch({ type: 'SET_NPC', payload: response.data })
            })
    }, [dispatch, props.match.params.npcId])

    let proficiencyBonus = 2;

    if (level >= 17) {
        proficiencyBonus = 6;
    } else if (level >= 13) {
        proficiencyBonus = 5;
    } else if (level >= 9) {
        proficiencyBonus = 4;
    } else if (level >= 5) {
        proficiencyBonus = 3;
    }

    let expertiseBonus = proficiencyBonus * 2;

    const handleStatChange = (prop, event) => {
        let bonus = 0;

        if (event.target.value > 11) {
            bonus = Math.floor((event.target.value - 10) / 2);
        } else if (event.target.value < 9) {
            bonus = Math.ceil(-((10 - event.target.value) / 2));
        }

        console.log(proficiencies.prop);


        if (proficiencies[prop] === 'prof') {
            bonus += proficiencyBonus;
        } else if (proficiencies[prop] === 'exp') {
            bonus += expertiseBonus;
        }

        setStats({ ...stats, [prop]: event.target.value })
        setBonuses({ ...bonuses, [prop]: bonus })

    }

    const handleSelect = (event) => {
        // make value palatable for database
        // let value = event.target.value;
        // value = value.toLowerCase().replace(' ', '_');
        let split = event.target.value.split(',');
        
        let value = split[0];
        let skill = split[1];

        if (!proficiencies[value] || proficiencies[value] === 'exp') {
            setProficiencies({ ...proficiencies, [value]: 'prof' });
        }

        if (skill && stats[skill]) {
            setBonuses({ ...bonuses, [value]: stats[skill] + proficiencyBonus })
        } else {
            setBonuses({ ...bonuses, [value]: proficiencyBonus })
        }

    };

    const handleSelectExpertise = (event) => {
        // make value palatable for database
        // let value = event.target.value;
        // value = value.toLowerCase().replace(' ', '_');
        let value = event.target.value[1] ? event.target.value[0] : event.target.value;
        let skill = event.target.value[1] ? event.target.value[1] : null;

        if (!proficiencies[value] || proficiencies[value] === 'prof') {
            setProficiencies({ ...proficiencies, [value]: 'exp' })
        }

        if (skill && stats[skill]) {
            setBonuses({ ...bonuses, [value]: stats[skill] + expertiseBonus })
        } else {
            setBonuses({ ...bonuses, [value]: expertiseBonus })
        }
    };

    const handleStaticStatChange = (prop, event) => {
        setStats({ ...stats, [prop]: event.target.value });
    }

    const filterObject = (object, filter) => {
        let arr = []

        for (const prop in object) {
            if (proficiencies[prop] === filter) {
                arr.push(prop)
            }
        }

        return arr;
    }

    return (
        <>
            <div className="npc-stats-header-container">
                <h1>{name}</h1>
                <h1>{character_class}</h1>
                <h1>Level: {level}</h1>
            </div>
            <h1 style={{ 'textAlign': 'center' }}>Skills</h1>
            <div className="npc-stats-form-container">
                <div className="npc-stats-form-container__skills-column">
                    <div>
                        <h2>Health</h2>
                        <input onChange={(event) => handleStaticStatChange('health', event)} type="number" placeholder="Hitpoints" />
                    </div>
                    <div>
                        <h2>Speed</h2>
                        <input onChange={(event) => handleStaticStatChange('speed', event)} type="number" placeholder="Movement Speed" />
                    </div>
                    <div>
                        <h2>Armor Class</h2>
                        <input onChange={(event) => handleStaticStatChange('armor_class', event)} type="number" placeholder="Armor Class" />
                    </div>
                    <div>
                        <h2>Strength</h2>
                        <input onChange={(event) => handleStatChange('strength', event)} type="number" placeholder="0 - 20" />
                    </div>
                    <div>
                        <h2>Dexterity</h2>
                        <input onChange={(event) => handleStatChange('dexterity', event)} type="number" placeholder="0 - 20" />
                    </div>
                    <div>
                        <h2>Constitution</h2>
                        <input onChange={(event) => handleStatChange('constitution', event)} type="number" placeholder="0 - 20" />
                    </div>
                    <div>
                        <h2>Intelligence</h2>
                        <input onChange={(event) => handleStatChange('intelligence', event)} type="number" placeholder="0 - 20" />
                    </div>
                    <div>
                        <h2>Wisdom</h2>
                        <input onChange={(event) => handleStatChange('wisdom', event)} type="number" placeholder="0 - 20" />
                    </div>
                    <div>
                        <h2>Charisma</h2>
                        <input onChange={(event) => handleStatChange('charisma', event)} type="number" placeholder="0 - 20" />
                    </div>
                    <h1>Add Proficiency</h1>
                    <div>
                        <select onChange={(event) => handleSelect(event)}>
                            <option value={["Strength"]}>Strength</option>
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
                    </div>
                    {filterObject(proficiencies, 'prof')[0] &&
                        <ul>
                            {filterObject(proficiencies, 'prof').map((proficiency) =>
                                <li>{proficiency}</li>
                            )}
                        </ul>
                    }
                    {character_class && character_class.toLowerCase() === 'rogue' &&
                        <>
                            <h1>Add Expertise</h1>
                            <div>
                                <select onChange={(event) => handleSelectExpertise(event)}>
                                    <option value={["Strength"]}>Strength</option>
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
                            </div>
                        </>
                    }
                    {filterObject(proficiencies, 'exp')[0] &&
                        <ul>
                            {filterObject(proficiencies, 'exp').map((ex) =>
                                <li>{ex}</li>
                            )}
                        </ul>
                    }
                </div>
                <div className="npc-stats-form-container__skills-column">
                    <div>
                        <h2>Acrobatics</h2>
                        <input onChange={() => { }} type="number" placeholder="Dex" value={bonuses.dexterity && Number(bonuses.dexterity)} />
                    </div>
                    <div>
                        <h2>Animal Handling</h2>
                        <input onChange={() => { }} type="number" placeholder="Wis" value={bonuses.wisdom && Number(bonuses.wisdom)} />
                    </div>
                    <div>
                        <h2>Arcana</h2>
                        <input onChange={() => { }} type="number" placeholder="Int" value={bonuses.intelligence && Number(bonuses.intelligence)} />
                    </div>
                    <div>
                        <h2>Athletics</h2>
                        <input onChange={() => { }} type="number" placeholder="Str" value={bonuses.strength && Number(bonuses.strength)} />
                    </div>
                    <div>
                        <h2>Deception</h2>
                        <input onChange={() => { }} type="number" placeholder="Cha" value={bonuses.charisma && Number(bonuses.charisma)} />
                    </div>
                    <div>
                        <h2>History</h2>
                        <input onChange={() => { }} type="number" placeholder="Int" value={bonuses.intelligence && Number(bonuses.intelligence)} />
                    </div>
                    <div>
                        <h2>Insight</h2>
                        <input onChange={() => { }} type="number" placeholder="Wis" value={bonuses.wisdom && Number(bonuses.wisdom)} />
                    </div>
                    <div>
                        <h2>Intimidation</h2>
                        <input onChange={() => { }} type="number" placeholder="Cha" value={bonuses.charisma && Number(bonuses.charisma)} />
                    </div>
                    <div>
                        <h2>Investigation</h2>
                        <input onChange={() => { }} type="number" placeholder="Int" value={bonuses.intelligence && Number(bonuses.intelligence)} />
                    </div>
                    <div>
                        <h2>Medicine</h2>
                        <input onChange={() => { }} type="number" placeholder="Wis" value={bonuses.wisdom && Number(bonuses.wisdom)} />
                    </div>
                    <div>
                        <h2>Nature</h2>
                        <input onChange={() => { }} type="number" placeholder="Int" value={bonuses.intelligence && Number(bonuses.intelligence)} />
                    </div>
                    <div>
                        <h2>Perception</h2>
                        <input onChange={() => { }} type="number" placeholder="Wis" value={bonuses.wisdom && Number(bonuses.wisdom)} />
                    </div>
                    <div>
                        <h2>Performance</h2>
                        <input onChange={() => { }} type="number" placeholder="Cha" value={bonuses.charisma && Number(bonuses.charisma)} />
                    </div>
                    <div>
                        <h2>Persuasion</h2>
                        <input onChange={() => { }} type="number" placeholder="Cha" value={bonuses.charisma && Number(bonuses.charisma)} />
                    </div>
                    <div>
                        <h2>Religion</h2>
                        <input onChange={() => { }} type="number" placeholder="Int" value={bonuses.intelligence && Number(bonuses.intelligence)} />
                    </div>
                    <div>
                        <h2>Sleight of Hand</h2>
                        <input onChange={() => { }} type="number" placeholder="Dex" value={bonuses.dexterity && Number(bonuses.dexterity)} />
                    </div>
                    <div>
                        <h2>Stealth</h2>
                        <input onChange={() => { }} type="number" placeholder="Dex" value={bonuses.dexterity && Number(bonuses.dexterity)} />
                    </div>
                    <div>
                        <h2>Survival</h2>
                        <input onChange={() => { }} type="number" placeholder="Wis" value={bonuses.wisdom && Number(bonuses.wisdom)} />
                    </div>
                </div>
            </div>
            <button className="npc-stats-save">SAVE</button>
        </>
    )
}

export default NpcStatsForm
