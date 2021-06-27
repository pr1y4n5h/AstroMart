import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {ThemeProvider} from "./Contexts/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <ThemeProvider>
    <App />
    </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

