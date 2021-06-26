import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes,Route} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/"> </Route>
      </Routes>
    </div>
  );
}

