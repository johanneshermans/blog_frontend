import './App.css';
import Posts from './pages/posts'
import Concept from './pages/concept'
import { Switch, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Johannes</h1>
        <p className="slogan">A blog about a creative technology process</p>
      </header>

      <nav className="navbar">
        <ul className="navbar__ul">
          <li className="navbar__li"><NavLink exact strict to={"/"} className={"navlink"}>
            Home
          </NavLink></li>
          <li className="navbar__li"><NavLink to={"/concept"} className={"navlink"}>Concept</NavLink></li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path={"/concept"}>
            <Concept />
          </Route>
          <Route path={"/"}>
            <Posts />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
