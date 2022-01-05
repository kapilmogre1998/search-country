import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Route, Switch } from 'react-router-dom';
import { Details } from './components/Details';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/details/:name">
          <Details />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
