import React, {useContext, useEffect, useRef, useState} from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

    useEffect(()=>{
      getNotes();
    }, [])

    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
      console.log(note.id);
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      e.preventDefault(); // Prevents the page from refreshing
      //AddNote(note.title, note.description, note.tag); // Call the AddNote function from context with the note
      //setNote({ title: "", description: "", tag: "" }); // Reset the form fields
    };
  
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    };


  
    const updateNote = (currentNote) =>{

      if (ref.current) {
        ref.current.click();
    }
      setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag: currentNote.tag});

    }
    

  return (
    <>
 
   <AddNote/>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div style={{backgroundColor:'darkslategrey'}} className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className='my-3'  >
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'> Titke </label>
            <input type='text' className='form-control' id='etitle' name='etitle' aria-describedby='emailHelp'  onChange={onChange} value={note.etitle} minLength={5} required/>
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'> Description </label>
            <input type='text' className='form-control' id='edescription' name='edescription' value={note.edescription}  onChange={onChange} minLength={5} required/>
          </div>
          <div className='mb-3'>
            <label htmlFor='tag' className='form-label'> Tag </label>
            <input type='text' className='form-control' id='eTag' name='eTag' value={note.etag} onChange={onChange}/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'> 
        <h2> Your Notes</h2>
        {notes.length===0 && '<div classname="container> No notes to display'}
        {
            notes.map((note) => {
                return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
        })}   
 
    </div>
    </>
  )
}

export default Notes
