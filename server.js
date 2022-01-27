const express = require('express');
const fs = require('fs');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'typingtestDB'
});

//connect to db
db.connect(err => {
    if(err) throw err;
    console.log('My SQL connected...');
})

function sortWords(unfilteredWords) {
    let wordStore = [];
    for(let i = 0; i<500; i++) {
        let randomIndex = Math.floor(Math.random()*3000);
        wordStore.push(unfilteredWords[randomIndex].word);
    }
    return wordStore;
}

//Init app
const app = express();  
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res, next) => {
    let sql = `SELECT word FROM words`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        let wordStore = sortWords(result);
        //now render the pug file
        res.render('index', {wStore: wordStore});
    })
    
});

// app.get('/setup', (req, res, next) => {         // create database on another route, as it will throw error if it is called in the default route
//     let sql = `INSERT INTO words (word) VALUES ?`;
//     fs.readFile('common_words.txt', 'utf-8', (err, data) => {
//         if(err) throw err;
//         let words = data.split(/\r\n/);
//         let nestedWords = words.map(word => {
//             return [word];
//         });
//         db.query(sql, [nestedWords], (err, result) => {
//             if(err) throw err;
//             res.send('Inserted Data');
//         });
//     })
    // work of /setup route is done when all the data is inserted into the database
// });

app.listen(3000, () => {
    console.log('Server has started on PORT 3000');
});
