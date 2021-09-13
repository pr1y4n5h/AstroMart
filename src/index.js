import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import { MainProvider } from "./Contexts/MainContext";
import { ProductProvider } from "./Contexts/ProductContext";
import { AuthProvider } from "./Contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <AuthProvider>
          <ProductProvider>
            <MainProvider>
              <App />
            </MainProvider>
          </ProductProvider>
        </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
