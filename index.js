'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const safeRoutes = require('./routes/safe-routes');
const multer = require('multer');
const forms = multer();


const app = express();

app.use(express.json());
app.use(cors());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', safeRoutes.routes);



app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
