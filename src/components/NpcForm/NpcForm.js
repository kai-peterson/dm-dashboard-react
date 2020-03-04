import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './NpcForm.css';
import axios from 'axios';

const NpcForm = (props) => {
    const history = useHistory();
    const sessionId = props.match.params.id;

    const [npcInfo, setNpcInfo] = useState({ session_id: Number(sessionId) })

    const handleNpcInfoChange = (prop, event) => {
        setNpcInfo({ ...npcInfo, [prop]: event.target.value })
    }

    const handlePostNpc = () => {
        // validate that user has completed all fields in form
        if (Object.values(npcInfo).length != 12) {
            alert("You missed a field")
        } else {
            axios.post('http://localhost:8080/npc', npcInfo)
                .then((response) => {
                    console.log(response);
                    const npcId = response.data.id;
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
                <h2>Class: </h2>
                <input onChange={(event) => handleNpcInfoChange('character_class', event)} placeholder="Class" />
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
                <label for="important">Important</label>
                <input onClick={(event) => handleNpcInfoChange('important', event)} name="importantBoolean" id="important" value="true" type="radio" />
                <label for="unimportant">Not Important</label>
                <input onClick={(event) => handleNpcInfoChange('important', event)} name="importantBoolean" id="unimportant" value="false" type="radio" />
            </div>
            <textarea onChange={(event) => handleNpcInfoChange('notes', event)} placeholder="Extra character notes" />
            <button onClick={handlePostNpc}>Create NPC</button>
        </div>
    )
}

export default NpcForm
