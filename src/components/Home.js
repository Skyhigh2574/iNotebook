import React, { useContext } from 'react';
import { Route, Router } from 'react-router-dom';
import noteContext  from '../context/notes/noteContext';
import Notes from './Notes';
import AddNote from './AddNote';



const Home = () => {

  const Context = useContext(noteContext);
  const {notes, setNotes} = Context;

  return (
    <div className='container'>
    <div className='container my-3' >

    </div>
      
      <Notes/>
    
    </div>

  )
}

export default Home
