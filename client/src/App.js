import React from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Card from './components/Card';
import List from './components/List';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/payments/:id" component={Card} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
