'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
 
require('./src/routes/index')(app);

app.use(cors());
// app.use(express.json());
app.listen(3000);

