var express = require('express');
var app = express();
var port = process.env.PORT || 3002;
var bodyParser = require('body-parser');
var cors = require('cors');
var renderer = require('./api/index');
var login = require('./api/login');
var compress = require('compression');

app.use(cors());
app.use(compress());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true })); 
 
app.use('/api',  renderer);
app.use('/api/login',  login);

app.listen(port, () => {
    console.log('server active');
});