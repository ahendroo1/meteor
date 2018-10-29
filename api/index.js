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
        // if(error) throw error;
        console.log(hasil);
        res.send(hasil);
    })
})

router.get('/data/:product', (req, res)=>{
    var perintah = 
    `select * from tb_product where nama_product = ?`;
    db.query(perintah, req.params.product, (error, hasil)=>{
        if(error) throw error;
        console.log(hasil);
        res.send(hasil);
    })
})


module.exports = router ;