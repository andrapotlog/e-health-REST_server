const { response } = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getPatients = async (req, res, next) => {
  
  try {
    const [rows] = await conn.execute(
      "SELECT last_name,first_name FROM patients");
    res.contentType("application/json");
    
    
    console.log("Query successfull");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    console.log(err);
    next(err);
  }
};
