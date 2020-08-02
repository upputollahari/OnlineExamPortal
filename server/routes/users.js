const _ = require('lodash');
const { User } = require('../models/user');
const { Admin } = require('../models/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const config = require('../dbdetails/config');
const bcrypt = require('bcryptjs');
const { UserResult } = require('../models/userresult');

mongoose.connect(config.mongooseURL)
mongoose.Promise = global.Promise;

// getting authenticate admin
router.post('/adminAuthenticate', async (req, res) => {

    req.body.email = req.body.email.trim();
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send({message:'Invalid email or password.'});
    if(req.body.password!=admin.password) return res.status(400).send({message:'Invalid email or password.'});

    console.log(_.pick(admin, ['_id', 'adminName', 'email','isAdmin']));
    res.send(_.pick(admin, ['_id', 'adminName', 'email','isAdmin']));
});
// getting authenticate user
router.post('/userAuthenticate', async (req, res) => {

    req.body.email = req.body.email.trim();
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({message:'Invalid email or password.'});
    // const validPassword = await bcrypt.compare(req.body.password, user.password);
    // if (!validPassword) return res.status(400).send({message:'Invalid email or password.'});
    if(req.body.password!=user.password) return res.status(400).send({message:'Invalid email or password.'});

    console.log(_.pick(user, ['_id', 'userName', 'email']));
    // res.send(user);
    res.send(_.pick(user, ['_id', 'userName', 'email']));
});

// Registering new user
router.post('/registerUser', async (req, res) => {

    req.body.userName = req.body.userName.trim();
    req.body.email = req.body.email.trim();
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: 'User already registerd.' });

    user = new User(_.pick(req.body, ['userName', 'email', 'password']))
    // const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    // user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    console.log(user);
    // res.send(_.pick(user, ['_id', 'name', 'email','password']));
    res.send({ message: 'User registered successfully' })
});

router.get('/getAllUsers',  (req, res, next) => {
    UserResult.find({}, (error, response) => {
        if (error) {
            return res.json({ success: false, msg: { error } });
        } else {
            return res.json({ success: true, msg: response });
        }
    });
});



module.exports = router;