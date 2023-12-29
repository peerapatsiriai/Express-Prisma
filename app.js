const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        massage: err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Server is running on port'+ PORT) });