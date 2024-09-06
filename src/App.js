import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import { Fragment, useState } from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {

  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
     <div style={{backgroundColor: darkTheme ? "darkslategrey": "aliceblue", "color": darkTheme ? "white": "black"}}>

   
      <NoteState>
      
        <Router>
          <Fragment>
          
        <Navbar toggleTheme={toggleTheme} darkTheme={darkTheme} />
        <Alert/>
        
        <div className='container' >
          <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/about' element={<About />} />

            </Routes>

            </div>
            </Fragment>

        </Router>
       
         </NoteState>
      
     </div>
  );
}

export default App;
