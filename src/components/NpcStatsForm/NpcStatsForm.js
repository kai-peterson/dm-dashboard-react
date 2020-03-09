import React, { useState, useEffect } from 'react';
import './NpcStatsForm.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NpcStatSelect from '../NpcStatSelect/NpcStatSelect';

const npcSelector = (state) => state.npcReducer;

const NpcStatsForm = (props) => {
    const dispatch = useDispatch();
    const npcInfo = useSelector(npcSelector);

    const [stats, setStats] = useState({});
    const [currentSelected, setCurrentSelected] = useState({ prof: 'Strength', exp: 'Strength' });
    const [proficiencies, setProficiencies] = useState({});
    const [bonuses, setBonuses] = useState({});

    const { name, level, character_class } = npcInfo;

    // grab npc name, class, and level, then dispatch to reducer
    // needed to calclulate proficiency bonus and whether or not to render expertise drop down (rogues only)
    useEffect(() => {
        axios.get(`http://localhost:8080/npc/${props.match.params.npcId}`)
            .then((response) => {
                dispatch({ type: 'SET_NPC', payload: response.data })
            })
    }, [dispatch, props.match.params.npcId])

    // calcaulate profiency and expertise bonus based on character level
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

    // calculates the +/- bonus for a stat number
    const findBonus = (num) => {
        let bonus = 0;

        if (num > 11) {
            bonus = Math.floor((num - 10) / 2);
        } else if (num < 9) {
            bonus = Math.ceil(-((10 - num) / 2));
        }

        return bonus;
    }

    // tracks stats than don't affect anything else (health, speed, AC)
    const handleStaticStatChange = (prop, event) => {
        setStats({ ...stats, [prop]: event.target.value });
    }

    // tracks currently selected item in drop down menus 
    // to be used on button click (handleAddProf, handleAddExp)
    const handleSelectChange = (event, prop) => {
        setCurrentSelected({ ...currentSelected, [prop]: event.target.value })
    }

    // tracks stats in state
    // calcalates bonus for a specific stat, taking into account profiency and expertise bonus
    const handleStatChange = (prop, event) => {

        let bonus = findBonus(event.target.value);

        if (proficiencies[prop] === 'prof') {
            bonus += proficiencyBonus;
        } else if (proficiencies[prop] === 'exp') {
            bonus += expertiseBonus;
        }

        setStats({ ...stats, [prop]: event.target.value })
        setBonuses({ ...bonuses, [prop]: bonus })

    }

    // adds profiency to state and updates bonuses accordingly
    const handleAddProf = () => {

        // set value to the current profiency selection from drop down
        let value = currentSelected.prof

        // if the prof doesn't yet exist in state, or it's set to anything but 'prof' aka normal profiency, add it
        if (!proficiencies[value] || proficiencies[value] === 'exp' || proficiencies[value] === 'none' ) {
            setProficiencies({ ...proficiencies, [value]: 'prof' });
        }

        // if value is in stats, recalc bonus and add prof
        // value will only be in stats if this is a main skill (str, dex, con, etc.)
        // skills aren't held in stats, and if currentProf is a skill then this will never trigger
        // otherwise, just set bonus to prof or expertise bonus
        // calculation to add current bonus to prof bonus happens in renderBonus function
        if (stats[value]) {
            let bonus = findBonus(stats[value]);
            setBonuses({ ...bonuses, [value]: bonus + proficiencyBonus })
        } else {
            setBonuses({ ...bonuses, [value]: proficiencyBonus })
        }

    };

    const handleAddExp = () => {

        let value = currentSelected.exp

        if (!proficiencies[value] || proficiencies[value] === 'prof' || proficiencies[value] === 'none') {
            setProficiencies({ ...proficiencies, [value]: 'exp' })
        }

        if (stats[value]) {
            let bonus = findBonus(stats[value]);
            setBonuses({ ...bonuses, [value]: bonus + expertiseBonus })
        } else {
            setBonuses({ ...bonuses, [value]: expertiseBonus })
        }
    };

    // when deleted, reset profiency to none and reset bonus to just bonus from stats
    const handleResetProf = (prof) => {
        setProficiencies({...proficiencies, [prof]: 'none'});
        setBonuses({...bonuses, [prof]: findBonus(stats[prof])});
    }

    // filters out all object properties with using filter (either 'prof' or 'exp')
    // used to render only proficiencies or expertises from same object
    const filterObject = (object, filter) => {
        let arr = []

        for (const prop in object) {
            if (proficiencies[prop] === filter) {
                arr.push(prop)
            }
        }

        return arr;
    }

    // renders stat headers and input fields for main, non-static stats (str, dex, con, int, wis, cha)
    const renderStatInput = (stat) => {
        return (
            <div>
                <h2>{stat}</h2>
                <input onChange={(event) => handleStatChange(stat, event)} type="number" placeholder="0 - 20" />
            </div>
        )
    }

    // renders correct bonus for each stat and skill based on stats, bonuses, proficiencies, and expertise
    // statType argument only exists for skills; all main stats will hit the final else in the outermost set of conditionals
    // inner logic is just used to render a + in front of positive numbers and a - in front of negative
    const renderBonus = (bonus, statType) => {

        // if bonus doesn't exist for skill yet, but statType does (aka it's a skill)...
        // then calc bonus based soley of bonus for that stat
        if (bonus === undefined && statType && stats[statType]) {
            let totalBonus = findBonus(stats[statType]);
            if (totalBonus >= 0) {
                return <h2>{`+ ${totalBonus}`}</h2>
            } else {
                return <h2>{`- ${String(totalBonus).slice(1)}`}</h2>
            }
        } // if bonus for the skill already exists, take that into account and add onto bonus from stat
          else if (statType && stats[statType]) {
            if (stats[statType]) {
                let totalBonus = Number(bonus) + findBonus(stats[statType]);
                if (bonus !== undefined) {
                    if (totalBonus >= 0) {
                        return <h2>{`+ ${totalBonus}`}</h2>
                    } else {
                        return <h2>{`- ${String(totalBonus).slice(1)}`}</h2>
                    }
                } else {
                    return <h2>{''}</h2>;
                }
            }
        } // otherwise calculate just using the existing bonus in state
          else {
            if (bonus !== undefined) {
                if (Number(bonus) >= 0) {
                    return <h2>{`+ ${bonus}`}</h2>
                } else {
                    return <h2>{`- ${String(bonus).slice(1)}`}</h2>
                }
            } else {
                return <h2>{''}</h2>;
            }
        }
    }

    return (
        <>
            <div className="npc-stats-header-container">
                <h1>{name}</h1>
                <h1>{character_class}</h1>
                <h1>Level: {level}</h1>
            </div>
            <div className="npc-stats-form-container">
                <div className="npc-stats-form-container__skills-column">
                    <h1 style={{ 'textAlign': 'center' }}>Stats</h1>
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
                    {renderStatInput('Strength')}
                    {renderStatInput('Dexterity')}
                    {renderStatInput('Constitution')}
                    {renderStatInput('Intelligence')}
                    {renderStatInput('Wisdom')}
                    {renderStatInput('Charisma')}
                    <h1>Add Proficiency</h1>
                    <NpcStatSelect type='prof' handleSelectChange={handleSelectChange} handleAddSelection={handleAddProf} />
                    {filterObject(proficiencies, 'prof')[0] &&
                        <ul>
                            {filterObject(proficiencies, 'prof').map((proficiency) =>
                                <li>{proficiency}<button onClick={() => handleResetProf(proficiency)}><img src="/images/x-icon.png" alt="X icon"/></button></li>
                            )}
                        </ul>
                    }
                    {character_class && character_class.toLowerCase() === 'rogue' &&
                        <>
                            <h1>Add Expertise</h1>
                            <NpcStatSelect type='exp' handleSelectChange={handleSelectChange} handleAddSelection={handleAddExp} />
                        </>
                    }
                    {filterObject(proficiencies, 'exp')[0] &&
                        <ul>
                            {filterObject(proficiencies, 'exp').map((expertise) =>
                                <li>{expertise}<button onClick={() => handleResetProf(expertise)}><img src="/images/x-icon.png" alt="X icon"/></button></li>
                            )}
                        </ul>
                    }
                </div>
                <div className="npc-stats-form-container__skills-column">
                    <h1>Saving Throws</h1>
                    <div>
                        <h2>Strength</h2>
                        {renderBonus(bonuses.Strength)}
                    </div>
                    <div>
                        <h2>Dexterity</h2>
                        {renderBonus(bonuses.Dexterity)}
                    </div>
                    <div>
                        <h2>Constitution</h2>
                        {renderBonus(bonuses.Constitution)}
                    </div>
                    <div>
                        <h2>Intelligence</h2>
                        {renderBonus(bonuses.Intelligence)}
                    </div>
                    <div>
                        <h2>Wisdom</h2>
                        {renderBonus(bonuses.Wisdom)}
                    </div>
                    <div>
                        <h2>Charisma</h2>
                        {renderBonus(bonuses.Charisma)}
                    </div>
                    <h1>Skills</h1>
                    <div>
                        <h2>Acrobatics</h2>
                        {renderBonus(bonuses.Acrobatics, 'Dexterity')}
                    </div>
                    <div>
                        <h2>Animal Handling</h2>
                        {renderBonus(bonuses['Animal Handling'], 'Wisdom')}
                    </div>
                    <div>
                        <h2>Arcana</h2>
                        {renderBonus(bonuses.Arcana, 'Intelligence')}
                    </div>
                    <div>
                        <h2>Athletics</h2>
                        {renderBonus(bonuses.Athletics, 'Strength')}
                    </div>
                    <div>
                        <h2>Deception</h2>
                        {renderBonus(bonuses.Deception, 'Charisma')}
                    </div>
                    <div>
                        <h2>History</h2>
                        {renderBonus(bonuses.History, 'Intelligence')}
                    </div>
                    <div>
                        <h2>Insight</h2>
                        {renderBonus(bonuses.Insight, 'Wisdom')}
                    </div>
                    <div>
                        <h2>Intimidation</h2>
                        {renderBonus(bonuses.Intimidation, 'Charisma')}
                    </div>
                    <div>
                        <h2>Investigation</h2>
                        {renderBonus(bonuses.Investigation, 'Intelligence')}
                    </div>
                    <div>
                        <h2>Medicine</h2>
                        {renderBonus(bonuses.Medicine, 'Wisdom')}
                    </div>
                    <div>
                        <h2>Nature</h2>
                        {renderBonus(bonuses.Nature, 'Intelligence')}
                    </div>
                    <div>
                        <h2>Perception</h2>
                        {renderBonus(bonuses.Perception, 'Wisdom')}
                    </div>
                    <div>
                        <h2>Performance</h2>
                        {renderBonus(bonuses.Performance, 'Charisma')}
                    </div>
                    <div>
                        <h2>Persuasion</h2>
                        {renderBonus(bonuses.Persuasion, 'Charisma')}
                    </div>
                    <div>
                        <h2>Religion</h2>
                        {renderBonus(bonuses.Religion, 'Intelligence')}
                    </div>
                    <div>
                        <h2>Sleight of Hand</h2>
                        {renderBonus(bonuses['Sleight of Hand'], 'Dexterity')}
                    </div>
                    <div>
                        <h2>Stealth</h2>
                        {renderBonus(bonuses.Stealth, 'Dexterity')}
                    </div>
                    <div>
                        <h2>Survival</h2>
                        {renderBonus(bonuses.Survival, 'Wisdom')}
                    </div>
                </div>
            </div>
            <button className="npc-stats-save">SAVE</button>
        </>
    )
}

export default NpcStatsForm
