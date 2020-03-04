import React from 'react';
import { useHistory } from 'react-router-dom';
import './Session.css';

const Session = () => {
    const history = useHistory();

    const handleAddSession = () => {
        history.push('/session-form');
    }

    return (
        <div>
            <button onClick={handleAddSession}>Add New Session</button>
        </div>
    )
}

export default Session
