import React, { useState } from 'react';
import './Nav.css';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Nav() {
    const [value, setValue] = useState(0);
    const history = useHistory();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleRouteChange = (path) => {
        history.push(path);
    }

        return (
            <div className="top-nav">
                <AppBar position="static" style={{'background-color': 'darkslategrey'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab onClick={() => handleRouteChange("/audio")} label="Audio"/>
                        <Tab onClick={() => handleRouteChange("/dice")} label="Dice"/>
                        <Tab onClick={() => handleRouteChange("/calculator")} label="Calculator" />
                    </Tabs>
                </AppBar>
            </div>
        )
}

export default Nav
