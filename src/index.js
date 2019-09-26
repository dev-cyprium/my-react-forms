import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Home } from "./scenes/Home";
import { Router, Link, Route } from './components/Router';
import { ModalProvider } from './components/Modal';

const Hello = () => (
  <h1>Hello, world!</h1>
)

function App() {
  return (
  <Router>
    <Link to="/">
      Home
    </Link>
    <Link to="/hello">
      Hello
    </Link>

    <Route path="/" component={Home} />
    <Route path="/hello" component={Hello} />
  </Router>)
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>
, rootElement);
