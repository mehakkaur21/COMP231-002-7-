// Importing Express
const express = require("express");
const app = express();

// Importing Path
const path = require('path');

// Serving Public folder as static for assets and css
app.use(express.static(path.join(__dirname,'Public')));

// app.use('/',(req,res,next)=>{
//   res.render('index.ejs');
// })

const homeRoutes = require('./routes/home');
app.use(homeRoutes.router);


// ADDING ERROR 404 PAGE
const errorController = require('./controller/error');
app.use(errorController.get404);

// Setting the view engine as ejs
app.set('view engine','ejs');
app.set('views','views')

// Starting the server
const port = process.env.PORT || 2100;
app.listen(port, () => {
  console.log('Listening on port 2100');
})

