const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    // redis = require('redis'),
    connection = require('./config/database');

const app = express();

const index = require('./routes/index');
register = require('./routes/register');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '0202ahctaM',
    cookie: { maxAge: 60000 }
}));
app.use(flash());


//Routes
app.use('/', index);
app.use('/register', register);

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(8000, () => {
    console.log(`Server running on port: 8000`);
});