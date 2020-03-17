import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Nav.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Nav() {
    const { pathname } = useLocation();
    const history = useHistory();
    const [value, setValue] = useState(0);

    // keep correct tab selected on refresh
    // not the best solution but it works
    useEffect(() => {
        switch (pathname) {
            case '/dice':
                setValue(1);
                break;
            case '/calculator':
                setValue(2);
                break;
            case '/session':
                setValue(3);
                break;
            case '/spells':
                setValue(4);
                break;
            case '/monsters':
                setValue(5);
                break;
            default:
                break;
        }
    }, [pathname])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleRouteChange = (path) => {
        history.push(path);
    }

    return (
        <div className="top-nav">
            <AppBar position="static" style={{ 'backgroundColor': 'darkslategrey' }}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab onClick={() => handleRouteChange("/audio")} label="Audio" />
                    <Tab onClick={() => handleRouteChange("/dice")} label="Dice" />
                    <Tab onClick={() => handleRouteChange("/calculator")} label="Calculator" />
                    <Tab onClick={() => handleRouteChange("/session")} label="Session" />
                    <Tab onClick={() => handleRouteChange("/spells")} label="spells" />
                    <Tab onClick={() => handleRouteChange("/monsters")} label="Monsters" />
                </Tabs>
            </AppBar>
        </div>
    )
}

export default Nav
