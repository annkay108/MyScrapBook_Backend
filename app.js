const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');  
var myscrapbookRouter = require('./routes/myScrapBook');

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
.then (()=> console.log(`Connected to database`))
.catch((err)=> console.error(err));

const app = express();

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24*60*60
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie:{
      maxAge: 24*60*60*1000
    }
  })
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/myscrapbook',myscrapbookRouter);

app.use((req, res, next)=>{
  res.status(404).json({code:'not found'});
})

// ERROR HANDLING
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only send the error if the error ocurred before sending the response 
  // (don't try to send the response after it has already been sent)
  if (!res.headersSent) {
    const statusError = err.status || '500';
    res.status(statusError).json(err);
  }
});

module.exports = app;