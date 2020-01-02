const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    connection = require('./config/database');

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '0202ahctaM',
    cookie: { maxAge: 6000000 }
}));
app.use(flash());

// include router
const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/indexRoute');

// routing
app.all('/', indexRoute);
app.use('/user', userRoute);

// starting server
app.listen(8000, () => {
    console.log(`Server running on port: 8000`);
});