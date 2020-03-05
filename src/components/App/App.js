import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../Nav/Nav';
import AudioDashboard from '../AudioDashboard/AudioDashboard';
import DiceRoller from '../DiceRoller/DiceRoller';
import Calculator from '../Calculator/Calculator';
import SessionDisplay from '../SessionDisplay/SessionDisplay';
import Session from '../Session/Session';
import SessionForm from '../SessionForm/SessionForm';
import NpcForm from '../NpcForm/NpcForm';
import NpcStatsForm from '../NpcStatsForm/NpcStatsForm';

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
        <Route exact path="/session" component={SessionDisplay} />
        <Route exact path="/session/:id" component={Session} />
        <Route exact path="/session-form" component={SessionForm} />
        <Route exact path="/session/:id/npc" component={NpcForm} />
        <Route exact path="/session/:sessionId/npc/:npdId/stats" component={NpcStatsForm} />
      </div>
    </Router>
  );
}

export default App;
