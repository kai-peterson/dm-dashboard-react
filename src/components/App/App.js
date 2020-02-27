import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import NavBar from '../Nav/Nav';
import AudioDashboard from '../AudioDashboard/AudioDashboard';
import DiceRoller from '../DiceRoller/DiceRoller';
import Calculator from '../Calculator/Calculator';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>DM Dashboard</h1>
        </header>
        <NavBar />
        <Redirect from="/" to="/audio"/>
        <Route exact path="/audio" component={AudioDashboard}/>
        <Route exact path="/dice" component={DiceRoller}/>
        <Route exact path="/calculator" component={Calculator}/>
      </div>
    </Router>
  );
}

export default App;
