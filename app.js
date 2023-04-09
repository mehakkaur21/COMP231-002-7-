// Importing Express
const express = require("express");
const app = express();

// Importing Path
const path = require('path');

// Serving Public folder as static for assets and css
app.use(express.static(path.join(__dirname, 'public')));

// Adding body parser
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({ extended: false }));

// npm install --save connect-flash
var flash = require('connect-flash');

// Importing Mongoose
const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://mehak:mehak@cluster0.lglyjss.mongodb.net/CleaningService"

// ADDING SESSION
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

// npm install cookie - parser
var cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(
  session({
    secret: 'my secret',
    resave: 'false',
    saveUninitialized: false,
    store: store
  })
);
// Serving login status to all pages
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  console.log(req.session.user);
  next();
})

// USING FLASH FUNCTION TO SEND RESPONSES TO USER
app.use(flash());


const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const bookingRoutes = require('./routes/booking');
app.use(homeRoutes.router);
app.use(authRoutes.router);
app.use(dashboardRoutes.router);
app.use(bookingRoutes.router);


// ADDING ERROR 404 PAGE
const errorController = require('./controller/error');
app.use(errorController.get404);

// Setting the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', 'views')



mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('Connected To SurveyIt Database Successfully')
    const port = process.env.PORT || 2100;
    // Starting the server
    app.listen(port, () => {
      console.log('Listening on port 2100');
    })
  });