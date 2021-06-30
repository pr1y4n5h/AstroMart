import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {ThemeProvider} from "./Contexts/ThemeContext";
import {MainProvider} from "./Contexts/MainContext";
import {WishlistProvider} from "./Contexts/WishlistContext";

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <ThemeProvider>
  <WishlistProvider>
  <MainProvider>
    <App />
    </MainProvider>
    </WishlistProvider>
    </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

