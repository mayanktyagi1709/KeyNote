import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

import { Routes, Route} from "react-router-dom";
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      // we could have used message instead of msg too.
      // this is just to show the distinction that we can use the same name as well as diff names
      // of the object attributes and parameters passed to the function.
      msg: message,
      type: type,
    });
  };

  setTimeout(() => {
    setAlert(null);
  }, 1500);
  return (
    <>
    <NoteState>
      <Navbar/>
      <Alert alert={alert} />
      <div className="container my-3">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="about" element={<About showAlert={showAlert}/>} />
            <Route path="login" element={<Login showAlert={showAlert}/>} />
            <Route path="signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
