import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../Nav/Nav';
import AudioDashboard from '../AudioDashboard/AudioDashboard';
import DiceRoller from '../DiceRoller/DiceRoller';
import Calculator from '../Calculator/Calculator';
import Session from '../Session/Session';
import CurrentSession from '../CurrentSession/CurrentSession';
import SessionForm from '../SessionForm/SessionForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>DM Dashboard</h1>
        </header>
        <NavBar />
        <Route exact path="/audio" component={AudioDashboard}/>
        <Route exact path="/dice" component={DiceRoller}/>
        <Route exact path="/calculator" component={Calculator}/>
        <Route exact path="/session" component={Session} />
        <Route exact path="/session/:id" component={CurrentSession} />
        <Route exact path="/session-form" component={SessionForm} />
      </div>
    </Router>
  );
}

export default App;
