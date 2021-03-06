const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/user');
const Log = require('../models/log');

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLogin
} = require('../helpers/auth_middlewares');
const { create } = require('../models/user');

router.get('/getAll',isLoggedIn, async(req, res, next)=>{
    try {
        const id = req.session.currentUser._id;
        const loggedUser = await User.findByIdAndUpdate(id).populate('myLog');
        res.status(201).json(loggedUser.myLog);
    } catch (error) {
        next(createError(error));
    }
})

router.get('/:id', isLoggedIn, async(req, res, next)=>{
    try {
        const {id} = req.params;
        const oneLog = await Log.findById(id);
        res.status(201).json(oneLog);
    } catch (error) {
        next(createError(error));
    }
})

router.put('/:id', isLoggedIn, async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {title, body} = req.body;
        const updatedLog = await Log.findByIdAndUpdate(id,{title,body});
        const updateUser = await Log.findByIdAndUpdate(req.session.currentUser._id,{$push:{myLog: id}}).populate("myLog");
        res.status(200).json({updateUser, updatedLog});
    } catch (error) {
        next(createError(error));
    }
})

router.delete("/:id",isLoggedIn, async(req, res, next)=>{
    try {
        const {id} = req.params;
        const deleteLog = await Log.findByIdAndDelete(id);
        res.status(200).json(deleteLog);
    } catch (error) {
        next(createError(error));
    }
})

router.post(`/add`, isLoggedIn, async(req, res, next)=>{
    try {
        const{title, date, body} = req.body;
        const myid = req.session.currentUser._id;
        const newLog = await Log.create({title, date, body, userId: myid});
        const addLogToUser = await User.findByIdAndUpdate(myid,{$push:{myLog: newLog._id}}).populate('myLog');
        res.status(201).json(newLog);
    } catch (error) {
        next(createError(error));
    }
})
module.exports = router;