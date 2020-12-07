import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav/Nav.js";
import Boutique from "./Boutique.js";
import APropos from "./APropos.js";
import Home from "./Home.js";

import FirstCircles from "./iconComponents/FirstCircles";
import SecondCircles from "./iconComponents/SecondCircles";
import ThirdCircles from "./iconComponents/ThirdCircles";

import { ReactSVG } from "react-svg";

function App() {
  return (
    <Router>
      <div className="app">
        <FirstCircles className="circles-1" />
        <SecondCircles className="circles-2" />
        <ThirdCircles className="circles-3" />
        <Nav />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/boutique" exact component={Boutique} />
          <Route path="/apropos" component={APropos} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
