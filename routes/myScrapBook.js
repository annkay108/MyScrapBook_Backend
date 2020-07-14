const express = require('express');
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

router.get('/',isLoggedIn, (req, res, next)=>{
    const myLog = req.session.currentUser.myLog;
    res.status(201).json(myLog);
})

router.post(`/add/${time}`, isLoggedIn, async(req, res, next)=>{
    
})
module.exports = router;