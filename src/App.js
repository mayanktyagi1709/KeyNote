import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

import { Routes, Route} from "react-router-dom";
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
    <NoteState>
      <Navbar/>
      <Alert/>
      <div className="container my-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="about" element={<About/>} />
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
