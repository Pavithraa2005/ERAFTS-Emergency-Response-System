const express = require("express");
const router = express.Router();
const pool = require("../db");

/* GET all incidents */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incidents ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

/* POST new incident */
router.post("/", async (req, res) => {
  try {
    const {
      emergency_type,
      location_zone,
      severity,
      status
    } = req.body;

    const result = await pool.query(
      `INSERT INTO incidents
      (emergency_type, location_zone, severity,status)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [
        emergency_type,
        location_zone,
        severity,
        status
      ]
    );

    res.status(201).json({
      message: "Incident created successfully",
      data: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;

router.delete("/:id", async(req,res)=>{

    try{

        await pool.query(
        "DELETE FROM incidents WHERE id=$1",
        [req.params.id]
        );

        res.json({
            message:"Deleted"
        });

    }
    catch(err){

        res.status(500)
        .json({
            error:err.message
        });

    }

});

router.put("/:id", async(req,res)=>{

    try{

        const { status } =
        req.body;

        const result =
        await pool.query(

        `UPDATE incidents
         SET status=$1
         WHERE id=$2
         RETURNING *`,

         [
            status,
            req.params.id
         ]

        );

        res.json(
        result.rows[0]
        );

    }
    catch(err){

        res.status(500)
        .json({
            error:err.message
        });

    }

});