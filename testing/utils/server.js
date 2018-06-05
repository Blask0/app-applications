const coverage = require('istanbul-middleware');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8081;

console.log(`Server started on port ${PORT}`);

// app.use(express.static(path.join(__dirname, '../public-coverage')));
const handler = coverage.createHandler();
app.use('/coverage', function (...args) {
    try {
        handler(...args);
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT);
