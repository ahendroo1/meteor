var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meteor',
})

db.connect(()=>{
    console.log('Terhubung ke MySQL!')
});

router.post('/',(req, res) => {

	var salt = bcrypt.genSaltSync(10);

    if(req.body.akses && req.body.email && req.body.password){

        var reg_admin = {
            akses: req.body.akses,
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password, salt)
        }

        var run_sql = 'insert into tb_admin set ?'
        db.query(run_sql, reg_admin, (error, hasil)=>{
            if(error) throw error;
            console.log(hasil);
            res.send(hasil)
        })

	} else {

        res.sendStatus(403)

	}

})

module.exports = router ;