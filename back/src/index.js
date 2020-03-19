const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    // io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// include router
const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/indexRoute');

// routing
app.use('/user/', userRoute);
app.use('/index/', indexRoute);

const PORT = process.env.PORT || 8000;

// starting server
app.listen(PORT, () => {
    console.log(`Node server running on port: ${PORT}`);
});