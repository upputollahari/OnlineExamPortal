const express = require('express');
const router = express.Router();
const config = require('../dbdetails/config');;
const mongoose = require('mongoose');
const Exam = require('../models/exam');
const { UserResult } = require('../models/userresult');
mongoose.connect(config.mongooseURL)
mongoose.Promise = global.Promise;
var ObjectID = require('mongodb').ObjectID;
router.post('/createExam', (req, res) => {
    let newExam = new Exam(req.body);
    newExam.save((err,data)=> {
        if (err) {
            res.json({ success: false, msg: 'Failed to Create Exam' });
        } else {
            console.log(data);
            return res.json({ success: true, msg: 'Exam Created' });
        }
    });

});

router.get('/getExam',  (req, res, next) => {
    Exam.find({}, (error, response) => {
        if (error) {
            return res.json({ success: false, msg: { error } });
        } else {
            return res.json({ success: true, msg: response });
        }
    });
});

router.get('/getExam/:id',  (req, res, next) => {
    Exam.find({_id:ObjectID(req.params.id)}, (error, response) => {
        if (error) {
            return res.json({ success: false, msg: { error } });
        } else {
            return res.json({ success: true, msg: response });
        }
    });
});

router.post('/submitresult', (req, res, next) => {
    let result=new UserResult(req.body);
    result.save((err,data)=> {
        if (err) {
            res.json({ success: false, msg: 'Failed to submit Exam' });
        } else {
            console.log(data);
            return res.json({ success: true, msg: 'Exam successfully submitted' });
        }
    });
});


module.exports = router;
