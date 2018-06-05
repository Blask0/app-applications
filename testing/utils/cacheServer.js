const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 8081;

console.log(`Server started on port ${PORT}`);

let coverage = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/load', (req, res) => {
    res.send(coverage);
});

app.post('/save', (req, res) => {
    if (req.body) {
        coverage = Object.assign(coverage, req.body);
    }
    res.send(coverage);
});

app.listen(PORT);
