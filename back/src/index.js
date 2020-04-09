const express = require('express');
// const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header( 'Access-Control-Allow-Credentials', 'true');
    next();
  });

  // include router
const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/indexRoute');
const chatRoute = require('./routes/chatRoute');

const PORT = 8000;

// starting server
const server = app.listen(PORT,() => {
    console.log(`Node server running on port: ${PORT}`);
});

//socket
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    console.log('a user connected');
});

// routing
app.use('/user/', userRoute);
app.use('/index/', indexRoute);
app.use('/chat/', chatRoute);

