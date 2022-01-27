const express = require('express');
const fs = require('fs');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root'
});

//connect to db
db.connect(err => {
    if(err) throw err;
    console.log('My SQL connected...');
})

//Init app
const app = express();  
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/setup', (req, res, next) => {
    let sql = `CREATE DATABASE typingtestDB`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('Success');
    });
});

app.listen(3000, () => {
    console.log('Server has started on PORT 3000');
});
