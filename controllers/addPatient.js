const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.addPatient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  /* console.log(req.body);*/
  console.log(req.query); 
  
  const email = req.query.email;

  try{
    // Searching in the database for the email to see if it taken
    const [email_of_user] = await conn.execute(
        "SELECT email FROM patients WHERE `email`=?",
        [email]
      );

    if (email_of_user.length > 0) {
      console.log("The e-mail is already in use");
        return res.status(422).json({
            message: "The e-mail is already in use",
        });
    }

    // Inserting the new user into the database
    const [rows] = await conn.execute(
        "INSERT INTO patients (first_name, last_name, email, password, gender, birthdate, address, phone_number)" +
        "VALUES (?, ?,?, ?, ?, ?, ?, ?)",
        [req.query.first_name,
          req.query.last_name,
          req.query.email,
          req.query.password,
          req.query.gender,
          req.query.birthdate,
          req.query.address,
          req.query.phone_number
          /* req.body.first_name,
          req.body.last_name,
          req.body.email,
          req.body.password,
          req.body.gender,
          req.body.birthdate,
          req.body.address,
          req.body.phone_number */]
      );

    if (rows.affectedRows === 1) {
      console.log("POST successfull");
      return res.status(201).json({
        message: "The patient was successfully registered.",
      });
    }
    return res.send("ok!");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

