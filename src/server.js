const express = require('express');
const server = express();

//Configurar pasta publica
server.use(express.static("public"));

//Utilizando template engine
const nunkucks = require("nunjucks");
nunkucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get('/', (req,res) => {
    return res.render("index.html")
})

server.get('/create-point', (req,res) => {
    return res.render("create-point.html")
})

server.get('/search', (req,res) => {
    return res.render("search-results.html")
})

server.listen(3000, () => {
    console.log('Aplicação funcionando')
});

