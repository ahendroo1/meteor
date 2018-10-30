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

router.get('/', function (req, res) {

	return res.send("<h1>Back End !</h1>");
});

// get data
router.post('/data', cekToken, (req, res)=>{


    var run_sql = 'SELECT * FROM tb_product INNER JOIN tb_kategori ON tb_product.kode_kategori=tb_kategori.kode_kategori';
    db.query(run_sql, (error, hasil)=>{

        // console.log(hasil);
        // res.send(hasil);

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err){
                res.sendStatus(403)
            } else {
                res.json({
                    message: 'Success post',
                    authData,
                    hasil
                })  
            }
        })
    })

    

})

router.post('/data/:product', cekToken, (req, res)=>{


    var sql_run = 
    `select * from tb_product where nama_product = ?`;
    db.query(sql_run, req.params.product, (error, hasil)=>{
        if(error) throw error;
        // console.log(hasil);
        // res.send(hasil);

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err){
                res.sendStatus(403)
            } else {
                res.json({
                    message: 'Success post',
                    authData,
                    hasil
                })  
            }
        })
    })
})

router.post('/data', (req, res)=>{
    var data_product = { 
        kode_product: '1',
        kode_kategori: req.body.kode_kategori,
        nama_product: req.body.nama_product,
        harga: req.body.harga,
    }

    var run_sql = 'insert into tb_product set ?'
    db.query(run_sql, data_product, (error, hasil)=>{
        if(error) throw error;
        console.log(hasil);
        res.send(hasil)
    })
})




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