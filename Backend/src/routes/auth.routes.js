const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/login", async(req,res)=>{

    const {username,password}
    = req.body;

    const result =
    await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
    );

    if(result.rows.length===0){

        return res.status(401)
        .json({
            message:"Invalid User"
        });

    }

    const user =
    result.rows[0];

    if(user.password !== password){

        return res.status(401)
        .json({
            message:"Wrong Password"
        });

    }

    res.json({

        id:user.id,
        username:user.username,
        role:user.role

    });

});

module.exports = router;