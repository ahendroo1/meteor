var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meteor',
})

db.connect(()=>{
    console.log('Terhubung ke MySQL!')
});

router.get('/', function (req, res) {
	// console.log(req.protocol)
	return res.send("<h1>Login !</h1>");
});


module.exports = router ;