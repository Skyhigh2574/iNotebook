const express = require('express')
const router = express.Router();
const User = require('../models/Users');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'Harryisagoodb$oy'
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

router.get('/', (req, res) => {

    console.log(req.body);
    const user = User(req.body);
    res.send(req.body);
})


router.post('/createuser', [

    body('name', 'Enter valid name').isLength({ min: 3}),
    body('email', 'Email must be valid').isEmail(),
    body('password', 'Password must hhave min 5 length').isLength({ min: 5}),

], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array()})
    }

    try{
        let user = await User.findOne({
            email: req.body.email
        });
        if(user){
            return res.status(400).json({error: " Sorry a user with this email already exists"})
        }

        const salt =  await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

    });

    const data = 
    {
        user:{
            id: user.id
        }
    }

    const jwtData = jwt.sign(data, JWT_SECRET);
    console.log(jwtData);

    res.json(user)
    console.log(user);
}
        catch(error) {
            console.log(err);
            console.error(error.message);
            res.status(500).send("Some Server Error");
        }
})


router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async(req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user =  await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        console.log(passwordCompare);

        if(!passwordCompare){
            return res.status(400).json({error: "please try to login with correct password"})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    } catch(error){

        console.log(error.message);
        res.status(500).send("Internal Server Error");

    }
})

router.post('/getuser', fetchuser,
    async (req, res) =>{

        try{
            userid = req.user.id;
            const user = await User.findById(userid).select("-password");
            res.send(user);
        }
        catch(error){

            console.log(error.message);
            res.status(500).send({error:"Internal Server Error"});
        }

    }
)

module.exports = router;