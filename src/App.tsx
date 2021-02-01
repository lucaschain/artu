import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LevelSelection from './components/hud/level_selection';
import { LevelList } from './levels';
import Game from './components/game';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/fase/:levelName">
            <Level />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(): JSX.Element {
  return (
    <div>
      <LevelSelection levelList={LevelList} />
    </div>
  );
}

function Level() {
  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
