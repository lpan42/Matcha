const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const session = require('express-session');

router.post('/', (req,res) =>{
    if(req.body.email && req.body.username && req.body.firstname && req.body.lastname && req.body.password && req.body.password_repeat){

    }
   else{
       console.log('empty');
   }
   res.send(req.body);
})

module.exports = router;