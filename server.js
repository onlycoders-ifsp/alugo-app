const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/alugo-app'));

app.get('/*', (req, res) => {
    res.sendfile(__dirname + '/dist/alugo-app/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
});