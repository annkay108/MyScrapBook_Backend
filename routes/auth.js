const express = require ('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../models/user");

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/auth_middlewares");

router.post('/signup', isNotLoggedIn, validationLogin, async(req, res, next)=>{
  const {username, password, email} = req.body;
  try{
    const usernameExists = await User.findOne({username},'username');

    if(usernameExists) return next(createError(400));
    else{
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync (password, salt);
      const newUser = await User.create({username, password: hashPass, email});

      newUser.password = "*";
      req.session.currentUser = newUser;
      res
      .status(201)
      .json(newUser);
    }
  }
  catch(error){
    next (createError(error));
  }
})

router.post('/login', isNotLoggedIn, validationLogin, async (req, res, next)=>{
  const {username, password} = req.body;
  try {
    const user = await User.findOne({username});
    if (!user){
      next(createError(404));
    }
    else if (bcrypt.compareSync(password, user.password)){
      user.password = "*";
      req.session.currentUser = user;
      res.status(200)
      .json(user);
    }
    else{
      next(createError(401));
    }
  } catch (error) {
    next(createError(error));
  }
})

router.post('/logout',isLoggedIn,(req, res,next)=>{
  req.session.destroy();
  res
  .status(204)
  .send();
})

router.get('/me', isLoggedIn, (req, res, next)=>{
  const currentUserSessionData = req.session.currentUser;
  currentUserSessionData.password = "*";

  res.status(200).json(currentUserSessionData);
})

module.exports = router;
// to kill the port
// netstat -ano | findstr :5000
// taskkill //PID 3272 //F