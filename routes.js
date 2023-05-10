const router = require("express").Router();
const { body } = require("express-validator");
const cors = require("cors");

const { getPatients } = require("./controllers/getPatients");
const { getPatientByID } = require("./controllers/getPatientByID");

const { addPatient } = require("./controllers/addPatient");

const { updatePatient } = require("./controllers/updatePatient");

const { deletePatient } = require("./controllers/deletePatient");

router.get("/patients", getPatients);
router.get("/patient/:id", getPatientByID);

router.post("/patients", addPatient);

router.put("/patients", updatePatient);

router.delete("/patients", deletePatient);

module.exports = router; 