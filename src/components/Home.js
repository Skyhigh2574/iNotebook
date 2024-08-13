import React, { useContext } from 'react';
import { Route, Router } from 'react-router-dom';
import noteContext  from '../context/notes/noteContext';



const Home = () => {

  const Context = useContext(noteContext);
  const {notes, setNotes} = Context;

  return (
    <div>
    <div className='container my-3'>

      <h1> Add a note</h1>
      <form>

        <div class="mb-3">
          <label for="exampleinputEmail" class="form-label"> Email Address</label>

          <input type='email' class="form-control" id="Example Input Email" aria-describedby='emailHelp'/>
          <div id="emailHelp" class="form-text"> We'll never share email with anyone else.</div>
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword" class="form-label"> Password</label>
          <input type="password" class="form-control" id="exampleInputPassword"/>
        </div>

        <div class="mb-3">
          <input type="checkbox" class="form-check-input" id='exampleCheck'></input>
          <label class='form-check-label' for="exampleCheck1">Check me out </label>
        </div>

        <button type = "Submit" class="btn btn-primary">Submit  </button>
      </form>

    </div>
    <div className="container my-3">
      <h2> Your Notes</h2>
      {
        notes.map((note)=> {
          return note.title;
        })
      }
    </div>
    </div>

  )
}

export default Home
