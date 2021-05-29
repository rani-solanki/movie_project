const router = require('express').Router()
const auth = require('../middleware/auth') 
const { check, validationResult } = require('express-validator');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// verify the token is valid or not  and getting the back user information
router.get('/auth',auth,async(req,res) =>{
    try{
        const user = await User.findById(req.user.id)
        res.json(user)
      
    }catch(err){
        res.status(500).send('server error')
    }
})

    // / user or admin login
const valid = [
    check('email', 'please inclde unique and valid email'),
    check('password', 'please enter the sward password').isLength({ min: 6 })
]

router.post('/login', valid,auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Done validation 
    const { email, password } = req.body;

    try {
        //see user exite
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "invalid Email or password" }] })
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "invalid password" }] })
        }

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload,
            config.jwtSecret,
            { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    }
    catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})
module.exports = router
