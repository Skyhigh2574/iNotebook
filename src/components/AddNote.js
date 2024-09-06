import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    if (note.title && note.description && note.tag) {
      addNote(note.title, note.description, note.tag); // Call the AddNote function from context with the note
      setNote({ title: "", description: "", tag: "" }); // Reset the form fields
    } else {
      alert("Please fill out all fields");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className='container my-3'>
      <h2>Add a Note</h2>

      <form className='my-3'>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>Title</label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            value={note.title}
            onChange={onChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>Description</label>
          <textarea
            className='form-control'
            id='description'
            name='description'
            value={note.description}
            onChange={onChange}
            rows="5" // This sets the height of the textarea
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='tag' className='form-label'>Tag</label>
          <input
            type='text'
            className='form-control'
            id='tag'
            name='tag'
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <button disabled={note.title.length<=5 || note.description.length<=5} type='submit' className='btn btn-primary' onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
