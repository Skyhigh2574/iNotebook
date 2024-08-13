import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import { Fragment } from 'react';

function App() {
  return (
     <div className="App">
   
      <NoteState>
      
        <Router>
          <Fragment>
          
        <Navbar/>
        <div className='container'>
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
