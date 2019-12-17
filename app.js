const express = require('express'),
    path = require('path');
// const bodyParser = require('body-parser');
// const connection = require('./config/database');

const app = express();

const index = require('./routes/index');

app.use('/', index);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8000, () => {
    console.log(`Server running on port: 8000`);
});