import react, { useState } from "react";
import NoteContext from './noteContext';
import { json } from "react-router-dom";


const NoteState = (props) =>{


    let host = "http://127.0.0.1:5000";

    const notesInitial = [
    
            // {
            //     "_id": "66ba98e5c11bd4be07e18fc4",
            //     "user": "66ba944a467b9f295a89b9dc",
            //     "title": "Akbarnotes",
            //     "description": "tale of akbarbirble",
            //     "Tag": "General",
            //     "date": "2024-08-12T23:21:09.974Z",
            //     "__v": 0
            // },
            // {
            //     "_id": "66ba998bc3d19da2795b680f",
            //     "user": "66ba944a467b9f295a89b9dc",
            //     "title": "Birble",
            //     "description": "tale of Birble",
            //     "Tag": "General",
            //     "date": "2024-08-12T23:23:55.126Z",
            //     "__v": 0
            // }
                    
    ]


    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async () =>{

        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {

            method:'GET',
            headers: {
                "Content-Type":'application/josn',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhOWE4YmZlYjFiMDM2NzQwODgzN2NjIn0sImlhdCI6MTcyNDUzMTc3NH0.u5bXoynoNGyY2nYR6j7tNDKiY2jd4DnSRrxDLMvOwBM'
            },
                
            }
        );
        const json = await response.json();
        setNotes(json)
        console.log(json);
    
        
    }

    const getNote = async (id) =>{

        const response = await fetch(`${host}/api/notes/${id}/`, {

            method:'GET',
            headers: {
                "Content-Type":'application/josn',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhOWE4YmZlYjFiMDM2NzQwODgzN2NjIn0sImlhdCI6MTcyNDUzMTc3NH0.u5bXoynoNGyY2nYR6j7tNDKiY2jd4DnSRrxDLMvOwBM'
            },
            
            }
        );
        const json = await response.json();
        setNotes(json)
        console.log(json);
    
        
    }



    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhOWE4YmZlYjFiMDM2NzQwODgzN2NjIn0sImlhdCI6MTcyNDUzMTc3NH0.u5bXoynoNGyY2nYR6j7tNDKiY2jd4DnSRrxDLMvOwBM'
                },
                body: JSON.stringify({ title, description, tag })
            });
    
            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Error adding note:', errorResponse);
                throw new Error(errorResponse);
            }
    
            const json = await response.json();
            console.log('Note added:', json);
            setNotes(notes.concat(json)); // Update state with the new note
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    

    const deleteNote = async (id) =>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhOWE4YmZlYjFiMDM2NzQwODgzN2NjIn0sImlhdCI6MTcyNDUzMTc3NH0.u5bXoynoNGyY2nYR6j7tNDKiY2jd4DnSRrxDLMvOwBM'
            }
        });
        console.log("Deleting the note" + id);
        const newNotes = notes.filter((note) => { return note._id!==id});
        setNotes(newNotes)

    }

    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                    "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhOWE4YmZlYjFiMDM2NzQwODgzN2NjIn0sImlhdCI6MTcyNDUzMTc3NH0.u5bXoynoNGyY2nYR6j7tNDKiY2jd4DnSRrxDLMvOwBM'
                },
                body: JSON.stringify({ title, description, tag })
            });
            
            const json = await response.json();
            if (response.ok) {
                // Update the notes state only if the request was successful
                const newNotes = notes.map((note) =>
                    note._id === id ? { ...note, title, description, tag } : note
                );
                setNotes(newNotes);
            } else {
                console.error('Failed to update note:', json);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };
    
    // const update = () => {

    //     setTimeout(() => {
    //         setState({
    //          "name": "Someon",
    //          "class": "23"
    //         })
    //     }, 1000);
    // }

    return(
        <NoteContext.Provider value={{notes:notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;