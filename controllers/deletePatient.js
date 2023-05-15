const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.deletePatient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const userId = req.body.id;

  try{
    // Inserting the new user into the database
    const [rows] = await conn.execute(
        "DELETE FROM patients WHERE id_patient=?",
        [userId]
      );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The patient was successfully deleted.",
      });
    }
    return res.send("ok!");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

