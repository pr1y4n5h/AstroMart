import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {ThemeProvider} from "./Contexts/ThemeContext";
import {MainProvider} from "./Contexts/MainContext"

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <ThemeProvider>
  <MainProvider>
    <App />
    </MainProvider>
    </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

