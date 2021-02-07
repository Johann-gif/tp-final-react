import React from "react";
import "./AppBar.css";
import logo from "./AppBar.logo.svg";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Converter from "./components/Converter/";
import ErrorPage from "./components/ErrorPage/";

const App = () => (
  <div className="App">
    <header>
      <nav className="AppBar">
        <img
          className="AppBar-logo"
          src={logo}
          aria-label="people"
          alt="People"
        />
      </nav>
    </header>
    <main>
      <div className="container">
        <Switch>
          <Route path="/404">
            <ErrorPage />
          </Route>
          <Route exact path="/">
            <Converter />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    </main>
  </div>
);

export default App;
