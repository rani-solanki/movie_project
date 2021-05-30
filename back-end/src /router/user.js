const router = require('express').Router()
const { check, validationResult } = require('express-validator');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config')

const validation = [check(
    'name', "name is required").not().isEmpty(),
check('email', 'please inclde unique and valid email').isEmail(),
check('password', 'please enter the sward passward').isLength({ min: 6 }),
check('isAdmin', 'please enter the isAdmin').not().isEmpty()
]

// user or admin signin
router.post('/signin', validation, async (req, res) => {
    console.log(req.body)
    const error = validationResult(req)
    if (!error.isEmpty()){
            res.status(400).json({ error: error.array()})
    }

    const { name, email, password, isAdmin } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            res.status(404).send({ "error": "user already exit" })
        }
        user = new User({
            name,
            email,
            password,
            isAdmin
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,
            config.jwtSecret, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        await user.save();

        res.send("user rgisered")
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send(error)
    }
})

module.exports = router;

