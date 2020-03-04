import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SessionForm.css';
import axios from 'axios';

const SessionForm = () => {
    const history = useHistory();

    const [sessionName, setSessionName] = useState('');
    const [sessionNumber, setSessionNumber] = useState('');

    const handleNameChange = (event) => {
        setSessionName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setSessionNumber(event.target.value);
    }

    // create payload from state, post session, the push user to that session's page using route params
    const handleCreateSession = () => {
        const payload = {
            "name": sessionName,
            "number": sessionNumber
        }
        
        axios.post('http://localhost:8080/session', payload)
            .then( (response) => {
                console.log(response);
                history.push(`/session/${response.data.id}`)
            })
            .catch( (error) => {
                alert("Error creating session")
                console.log("Error posting session", error);
            })
    }

    return (
        <div className="session-form-container">
            <div>
                <h2>Session Name: </h2>
                <input onChange={handleNameChange} value={sessionName} placeholder="Session name" />
            </div>
            <div>
                <h2>Session Number: </h2>
                <input onChange={handleNumberChange} value={sessionNumber} placeholder="Session number" type="number" />
            </div>
            <button onClick={handleCreateSession}>CREATE</button>
        </div>
    )
}

export default SessionForm
