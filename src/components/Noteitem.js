import React from 'react';
import 'react-bootstrap';
import noteContext from '../context/notes/noteContext';
import NoteState from '../context/notes/NoteState';
import { useContext } from 'react';

const Noteitem = (props) => {
  
  // const context = useContext(noteContext);
  // const {deleteNode} = context;
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col my-3">
      <div className="card" style={{ width: '18rem' }}> {/* Adjust the width as needed */}
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5> {/* Replace with dynamic content */}
          <p className="card-text">{note.description}</p> {/* Replace with dynamic content */}
          <div className="d-flex align-items-center">
            <i className="far fa-edit mx-2 " onClick={() => {updateNote(note)}}></i>
            <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
          </div>
          <a href="#" className="btn btn-primary" role="button">Go Somewhere</a> {/* Reduced button size */}
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
