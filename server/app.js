const express = require("express");
const bodyParser = require("body-parser"); //post로 들어온것을 paser하기 위해 사용하는 bodyParser
const app = express();
const fs = require('fs');
const http = require('http');

const PORT = 5000;

app.use(bodyParser.json()); //bodyparser를 json타입으로 가져온다.
app.use(express.urlencoded({ extended: false}));

// mysql 접속
const mysql = require('mysql');
const db = require('./db/db');
const { select } = require('./db/dbquery');

app.get('/', select);

//미들웨어로 bodyParser로 들어온 값을 미리 세팅해서 검증함.
const postMiddleWare = (req, res, next) => {
    const { username, userpass, title, contents } = req.body; //req.body안에서 안에 변수들만 뽑아온다.
    if(!username || !userpass || !title || !contents) {
        return res.status(400).json({ message: '모든 필드를 입력 하시오.'});
    } 
    next(); //미들웨어는 반드시 다음값으로 next(); 해야한다.
}

app.post('/api', postMiddleWare, (req, res)=>{
    const { username, userpass, title, contents } = req.body;
    res.json({ message: { username, userpass, title, contents }});//받은 값을 다시 보내준다.
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});