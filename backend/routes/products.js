const express = require('express');
const router = express.Router();

const pool = require('../dbconfig');

//Import db


//Get all Products from db
router.get("/", (req, res) => {
    const selectQuery = "SELECT * FROM produits";
    pool.getConnection((err, connection) => {

        if (err) throw err;
        connection.query(selectQuery, (err, result) => {
            res.json({ result });
            connection.release();
            if (err) throw err;
        });
    })
})





module.exports = router;