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

    const findBonus = (num) => {
        let bonus = 0;

        if (num > 11) {
            bonus = Math.floor((num - 10) / 2);
        } else if (num < 9) {
            bonus = Math.ceil(-((10 - num) / 2));
        }

        return bonus;
    }

    const handleSelectChange = (event, prop) => {
        setCurrentSelected({ ...currentSelected, [prop]: event.target.value })
    }

    const handleStaticStatChange = (prop, event) => {
        setStats({ ...stats, [prop]: event.target.value });
    }

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

    const handleAddProf = () => {

        let split = currentSelected.prof.split(',');

        let value = split[0];
        let skill = split[1];

        if (!proficiencies[value] || proficiencies[value] === 'exp' || proficiencies[value] === 'none' ) {
            setProficiencies({ ...proficiencies, [value]: 'prof' });
        }

        console.log(bonuses[value]);


        if (stats[value]) {
            let bonus = findBonus(stats[value]);
            setBonuses({ ...bonuses, [value]: bonus + proficiencyBonus })
        } else if (!bonuses[value]) {
            setBonuses({ ...bonuses, [value]: proficiencyBonus })
        } else if (!bonuses[value] && stats[skill]) {
            let bonus = findBonus(stats[value]);
            setBonuses({ ...bonuses, [value]: bonus + proficiencyBonus })
        } else {
            setBonuses({ ...bonuses, [value]: proficiencyBonus })
        }

    };

    const handleAddExp = () => {

        let split = currentSelected.exp.split(',');

        let value = split[0];
        let skill = split[1];

        if (!proficiencies[value] || proficiencies[value] === 'prof' || proficiencies[value] === 'none') {
            setProficiencies({ ...proficiencies, [value]: 'exp' })
        }

        if (stats[value]) {
            let bonus = findBonus(stats[value]);
            setBonuses({ ...bonuses, [value]: bonus + expertiseBonus })
        } else if (!bonuses[value]) {
            setBonuses({ ...bonuses, [value]: expertiseBonus })
        } else if (!bonuses[value] && stats[skill]) {
            let bonus = findBonus(stats[value]);
            setBonuses({ ...bonuses, [value]: bonus + expertiseBonus })
        } else {
            setBonuses({ ...bonuses, [value]: expertiseBonus })
        }
    };

    const handleResetProf = (prof) => {
        setProficiencies({...proficiencies, [prof]: 'none'});
        setBonuses({...bonuses, [prof]: findBonus(stats[prof])});
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

    const renderStatInput = (stat) => {
        return (
            <div>
                <h2>{stat}</h2>
                <input onChange={(event) => handleStatChange(stat, event)} type="number" placeholder="0 - 20" />
            </div>
        )
    }

    const renderBonus = (bonus, statType, x) => {

        if (bonus === undefined && statType && stats[statType]) {
            let totalBonus = findBonus(stats[statType]);
            if (totalBonus >= 0) {
                return <h2>{`+ ${totalBonus}`}</h2>
            } else {
                return <h2>{`- ${String(totalBonus).slice(1)}`}</h2>
            }
        } else if (statType && stats[statType]) {
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
        } else {
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
            {JSON.stringify(stats, null, 2)}
        </>
    )
}

export default NpcStatsForm
