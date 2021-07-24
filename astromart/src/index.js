import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { MainProvider } from "./Contexts/MainContext";
import { ProductProvider } from "./Contexts/ProductContext";
import { AuthProvider } from "./Contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <MainProvider>
              <App />
            </MainProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
