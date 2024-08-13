import react, { useState } from "react";
import NoteContext from './noteContext';


const NoteState = (props) =>{

    const s1 = {

        "name": "Aakash",
        "class": "class of React"
    }

    const notesInitial = [
    
            {
                "_id": "66ba98e5c11bd4be07e18fc4",
                "user": "66ba944a467b9f295a89b9dc",
                "title": "Akbarnotes",
                "description": "tale of akbarbirble",
                "Tag": "General",
                "date": "2024-08-12T23:21:09.974Z",
                "__v": 0
            },
            {
                "_id": "66ba998bc3d19da2795b680f",
                "user": "66ba944a467b9f295a89b9dc",
                "title": "Birble",
                "description": "tale of Birble",
                "Tag": "General",
                "date": "2024-08-12T23:23:55.126Z",
                "__v": 0
            }
        
    ]

    const [state, setState] = useState(s1);
    const [notes, setNotes] = useState(notesInitial);

    const update = () => {

        setTimeout(() => {
            setState({
             "name": "Someon",
             "class": "23"
            })
        }, 1000);
    }

    return(
        <NoteContext.Provider value={{state:state, update:update, notes:notes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;