const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const router = express.Router();

router.get('/fetchallnotes', fetchuser, async (req, res) =>{

    const notes = await Notes.find({user: req.user.id});
    
    res.json(notes);
})

// router.get('/fetchnote/:id', fetchuser, async (req, res) =>{

//     var note =  await Notes.findById(req.params.id);
//     if(!note){
//         return res.status(404).send("Not Found");
//     }
//     if(note.user.toString() !== req.user.id){
//         return res.status(401).send("Not Allowed");
//     }
    
//     res.json(note);
// })

router.post('/addnote', fetchuser, [
    
    body('title', 'Enter a valid email').isLength({min: 3}),
    body('description', 'Enter Description').isLength({min: 3}),

], async (req, res) =>{

    try{

    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const note = new Notes({
        title, description, tag, user: req.user.id
    })

    const savedNote = await note.save();
    res.json([savedNote]);
}
    catch(error){
        console.error(error.message);
        res.status(500).send("INternal Server error");
    }
})


router.put('/updatenote/:id', fetchuser, async (req, res) =>{

    const {title, description, tag} = req.body;

    const newNote = {};

    if(title) {newNote.title = title};
    if(description) { newNote.description = description};4
    if(tag){ newNote.tag = tag};

    var note =  await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

    res.json({note});
})

router.delete('/deletenote/:id', fetchuser, async (req, res) =>{

    try{
    var note = await Notes.findById(req.params.id);

    if(!note){
        return res.status(400).send("Not Exists");
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send(" NOt Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted"});
}
catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}

})
module.exports = router;