import "./App.css";
import Navbar from "./components/navbar/Index";
import { Routes } from "react-router-dom";
import routing, { RoutesArr } from './components/routes/Index';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>{routing(RoutesArr)}</Routes>

    </div>
  );
}

export default App;
