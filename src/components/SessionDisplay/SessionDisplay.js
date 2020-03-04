import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SessionDisplay.css';
import axios from 'axios';

const Session = () => {
    const history = useHistory();
    const [sessions, setSessions] = useState([])

    useEffect( () => {
        axios.get('http://localhost:8080/session')
            .then( (response) => {
                console.log(response);
                setSessions(response.data)
            })
            .catch( (error) => {
                console.log("Error getting all sessions", error);
            })
    }, [])

    const handleAddSession = () => {
        history.push('/session-form');
    }

    const pushToSessionDetails = (id) => {
        history.push(`/session/${id}`)
    }

    return (
        <div className="session-display-container">
            <button onClick={handleAddSession}>Add New Session</button>
            <h2>All Sessions</h2>
            <ul>
                {sessions[0] && sessions.map( (session) => 
                    <li onClick={() => pushToSessionDetails(session.id)}>{`Session #${session.number}: ${session.name}`} <button>Details</button></li>
                )}
            </ul>
        </div>
    )
}

export default Session
