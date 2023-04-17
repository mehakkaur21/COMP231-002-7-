// Importing Express
const express = require("express");
const app = express();
const User =require('./model/users')
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
const adminRoutes = require('./routes/admin');
app.use(homeRoutes.router);
app.use(authRoutes.router);
app.use(dashboardRoutes.router);
app.use(bookingRoutes.router);
app.use(adminRoutes.router);


// ADDING ERROR 404 PAGE
const errorController = require('./controller/error');
app.use(errorController.get404);

// Setting the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', 'views')


const bcryptjs = require('bcryptjs');
mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('Connected To One Step Away Cleaner Database Successfully')
    User.findOne()
    .then(user=>{
      if(!user){
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateNow = date.toLocaleDateString('en-US', options);
        const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
        const time = new Date().toLocaleTimeString('en-US', options2);
        console.log('No User Exists Till Now, Thereofore creating our first user');
        let password = 'admin123'
        bcryptjs.hash(password, 12)
        .then(hashedPassword=>{
          const user = new User({
            firstName: "Admin",
            lastName: "Account",
            email:"admin@osac.com",
            password: hashedPassword,
            userType: 'admin',
            dateCreated: dateNow,
            timeCreated: time,
            notifications:[{
              notification: `Welcome to One Step Away Cleaner Admin !`,
              notificationTime: time,
              notificationDate: dateNow,
              notificationClass: "notification"
          }]
        })
        user.save();
        })
      }
    })

    const port = process.env.PORT || 3000;
    // Starting the server
    app.listen(port, () => {
      console.log('Listening on port 3000');
    })
  });