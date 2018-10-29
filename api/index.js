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

	return res.send("<h1>Back End !</h1>");
});

// get data
router.get('/data', (req, res)=>{
    var run_sql = 'SELECT * FROM tb_product INNER JOIN tb_kategori ON tb_product.kode_kategori=tb_kategori.kode_kategori';
    db.query(run_sql, (error, hasil)=>{

        console.log(hasil);
        res.send(hasil);
    })
})

router.get('/data/:product', (req, res)=>{
    var sql_run = 
    `select * from tb_product where nama_product = ?`;
    db.query(sql_run, req.params.product, (error, hasil)=>{
        if(error) throw error;
        console.log(hasil);
        res.send(hasil);
    })
})

router.post('/data', (req, res)=>{
    var data_product = { nama: req.body.nama_product,
        kode_kategori: req.body.kode_product, harga: req.body.harga,
    }

    var run_sql = 'insert into tb_product set ?'
    db.query(run_sql, data_product, (error, hasil)=>{
        if(error) throw error;
        console.log(hasil);
        res.send(hasil)
    })
})


module.exports = router ;