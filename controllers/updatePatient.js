const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.updatePatient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try{
    // Inserting the new user into the database
    const [rows] = await conn.execute(
        "UPDATE patients SET first_name = ?, last_name = ?, gender = ?, birthdate = ?, address = ?, phone_number = ? " +
        "WHERE id_patient=?",
        [/* req.query.first_name,
          req.query.last_name,
          req.query.email,
          req.query.password,
          req.query.gender,
          req.query.birthdate,
          req.query.address,
          req.query.phone_number,
          req.query.id */
          req.body.first_name,
          req.body.last_name,
          req.body.gender,
          req.body.birthdate,
          req.body.address,
          req.body.phone_number,
          req.body.id]
      );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The patient was successfully updated.",
      });
    }
    return res.send("ok!");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

