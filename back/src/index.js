const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const authSocket = require('./middleware/authSocket');
const chatModel = require('./models/chat');
const chatController = require('./controllers/chatController');

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
    socket.on('joinRoom', async ({token, id_chatroom}, callback) => {
        const {userid, error} = await authSocket.authSocket(token);
        if(error) return callback(error);
        const checkUser = await chatController.checkUserByChatroomId(id_chatroom, userid);
        if(checkUser.error){
            return callback(error);
        }
        socket.join(id_chatroom);
        const result = await chatController.getMessages(id_chatroom);
        socket.emit('getMessage', result);
    })
    socket.on('addMessage', async ({id_chatroom, newMessage, token}, callback) => {
        const {userid, error} = await authSocket.authSocket(token);
        if(error) return callback(error);
        await chatController.addMessage(id_chatroom, userid, newMessage);
        const result = await chatController.getMessages(id_chatroom);
        socket.emit('getMessage', result);
        socket.broadcast.to(id_chatroom).emit('getMessage', result);
    });
});

// routing
app.use('/user/', userRoute);
app.use('/index/', indexRoute);
app.use('/chat/', chatRoute);

