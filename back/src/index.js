const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    connection = require('./config/database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// include router
const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/indexRoute');

// routing
app.use('/user/', userRoute);
app.use('/index/', indexRoute);

// starting server
app.listen(8000, () => {
    console.log(`Node server running on port: 8000`);
});