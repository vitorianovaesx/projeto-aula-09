const express = require('express');
const app = express();

const sqlite3 = require('sqlite3');
const DBPATH = '../data/database.db';

app.use(express.static("../frontend/"));
app.use(express.json());

const hostname = '127.0.0.1';
const port = 3000;

// ENDPOINTS
app.post('/inserirMensagem', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body.mensagem)
    const mensagem = req.body.mensagem;
    let db = new sqlite3.Database(DBPATH);
    let sql = 'INSERT INTO mensagem (mensagem) VALUES (?)'
    db.run(sql, [mensagem], err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Mensagem inserida');
            res.send();
        } 
        db.close()
    })
})

app.get('/pegarMensagem', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    let db = new sqlite3.Database(DBPATH);
    let sql = 'SELECT * FROM mensagem';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        } else {console.log('Mensagem recebida')}
            res.send(rows);
    });
    db.close(); 
})


app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});