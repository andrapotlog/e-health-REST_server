const { response } = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getPatientByID = async (req, res, next) => {
  
  try {
    const userId = req.params.id;

    const [rows] = await conn.execute(
      "SELECT * FROM patients where id_patient=?", [userId]);
    res.contentType("application/json");

    if (rows.length < 1) {
      console.log("There is no user with this ID");
        return res.status(422).json({
            message: "No user found by ID",
        });
    }
    
    console.log("Query successfull");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    console.log(err);
    next(err);
  }
};
