import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Session.css';
import axios from 'axios';

const Session = (props) => {
    const history = useHistory();

    const [sessionInfo, setSessionInfo] = useState({});

    const sessionId = props.match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:8080/session/${sessionId}`)
            .then((response) => {
                setSessionInfo(response.data)
            })
            .catch((error) => {
                console.log("Error getting single session's info", error);
            })
    }, [])

    const handleAddNpc = () => {
        history.push(`/session/${sessionId}/npc`)
    }

    return (
        <div className="session-container">
            {sessionInfo.name &&
                <>
                    <h2>{`Session #${sessionInfo.number}`}</h2>
                    <h2>{sessionInfo.name}</h2>
                    <div>
                        <button onClick={handleAddNpc}>Add NPC</button>
                        <button>Add POI</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Session
