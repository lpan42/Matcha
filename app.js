const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');
    session = require('express-session');
    connection = require('./config/database');
   
const app = express();

const index = require('./routes/index');
    register = require('./routes/register');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/', index);
app.use('/register', register);

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(8000, () => {
    console.log(`Server running on port: 8000`);
});

https://www.js-tutorials.com/nodejs-tutorial/nodejs-session-example-using-express-session/