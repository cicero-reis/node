'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
//const md5 = require('md5');

const app = express();

//Conecta com o banco
mongoose.connect(config.connectionString);

//Carrega as Models
require('./models/course');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const courseRoute = require('./routes/course-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/courses', courseRoute);

module.exports = app;













