import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <div className="container my-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="About" element={<About/>} />
          </Routes>
        </div>
    </>
  );
}

export default App;
