import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NpcForm.css';
import axios from 'axios';

const NpcForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionId = props.match.params.id;

    const [npcInfo, setNpcInfo] = useState({ session_id: Number(sessionId), alignment: 'Lawful Good', sex: 'M' })

    const handleNpcInfoChange = (prop, event) => {
        setNpcInfo({ ...npcInfo, [prop]: event.target.value })
    }

    const handlePostNpc = () => {
        // validate that user has completed all fields in form
        if (Object.values(npcInfo).length !== 15) {
            alert("You missed a field")
        } else {
            axios.post('http://localhost:8080/npc', npcInfo)
                .then((response) => {
                    console.log(response);
                    const npcId = response.data.id;
                    dispatch({type: 'SET_NPC', payload: response.data})
                    history.push(`/session/${sessionId}/npc/${npcId}/stats`)
                })
                .catch((error) => {
                    console.log("Error posting NPC", error);
                })
        }
    }

    return (
        <div className="npc-form-container">
            <div>
                <h2>Name: </h2>
                <input onChange={(event) => handleNpcInfoChange('name', event)} placeholder="Name" />
            </div>
            <div>
                <h2>Age: </h2>
                <input onChange={(event) => handleNpcInfoChange('age', event)} placeholder="Age" type="number" />
            </div>
            <div>
                <h2>Level: </h2>
                <input onChange={(event) => handleNpcInfoChange('level', event)} placeholder="Level" type="number" />
            </div>
            <div>
                <h2>Class: </h2>
                <input onChange={(event) => handleNpcInfoChange('character_class', event)} placeholder="Class" />
            </div>
            <div className="npc-form-container__alignment-select">
                <h2>Alignment: </h2>
                <select onChange={(event) => handleNpcInfoChange('alignment', event)}>
                    <option value="Lawful Good">Lawful Good</option>
                    <option value="Neutral Good">Neutral Good</option>
                    <option value="Chaotic Good">Chaotic Good</option>
                    <option value="Lawful Neutral">Lawful Neutral</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Chaotic Neutral">Chaotic Neutral</option>
                    <option value="Lawful Evil">Lawful Evil</option>
                    <option value="Neutral Evil">Neutral Evil</option>
                    <option value="Chaotic Evil">Chaotic Evil</option>
                </select>
            </div>
            <div className="npc-form-container__sex-select">
                <h2>Sex: </h2>
                <select onChange={(event) => handleNpcInfoChange('sex', event)}>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div>
                <h2>Height: </h2>
                <input onChange={(event) => handleNpcInfoChange('height_feet', event)} placeholder="Feet" /><span>ft.</span>
                <input onChange={(event) => handleNpcInfoChange('height_inches', event)} placeholder="Inches" /><span>inches.</span>
            </div>
            <div>
                <h2>Weight: </h2>
                <input onChange={(event) => handleNpcInfoChange('weight', event)} placeholder="Weight" /><span>lbs.</span>
            </div>
            <div>
                <h2>Eye Color: </h2>
                <input onChange={(event) => handleNpcInfoChange('eye_color', event)} placeholder="Eyes" />
            </div>
            <div>
                <h2>Skin Color: </h2>
                <input onChange={(event) => handleNpcInfoChange('skin_color', event)} placeholder="Skin" />
            </div>
            <div>
                <h2>Hair: </h2>
                <input onChange={(event) => handleNpcInfoChange('hair', event)} placeholder="Hair" />
            </div>
            <div className="npc-form-container__radio-buttons">
                <label htmlFor="important">Important</label>
                <input onClick={(event) => handleNpcInfoChange('important', event)} name="importantBoolean" id="important" value="true" type="radio" />
                <label htmlFor="unimportant">Not Important</label>
                <input onClick={(event) => handleNpcInfoChange('important', event)} name="importantBoolean" id="unimportant" value="false" type="radio" />
            </div>
            <textarea onChange={(event) => handleNpcInfoChange('notes', event)} placeholder="Extra character notes" />
            <button onClick={handlePostNpc}>Create NPC</button>
        </div>
    )
}

export default NpcForm
