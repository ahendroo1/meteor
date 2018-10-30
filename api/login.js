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

router.post('/post', cekToken,(req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Success post',
                authData
            })  
        }
    })

})

router.post('/',  (req, res) => {

    var run_sql = 
    `select * from tb_admin where email = ?` ;
    db.query(run_sql, req.body.email , (err, hasil)=>{
        if(err) throw err;
        if(bcrypt.compareSync(req.body.password, hasil[0].password)){
                
            // return res.send(hasil);
            // console.log(hasil[0].password);

            jwt.sign({user : hasil}, 'secretkey', (err, token) => {
                res.json({
                    token
                })
            })
        } else {
            res.json('Warning Password.... ')
        }
    })


});

function cekToken(req, res, next){

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken ;

        next();

    } else {
        res.sendStatus(403)
    }

}


module.exports = router ;