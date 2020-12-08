import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Boutique from "./Boutique.js";
import APropos from "./APropos.js";
import Home from "./Home.js";

function App() {
  return (
    <Router>
      <div className="app">
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
