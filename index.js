const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const axios = require("axios");
const app = express();

app.use(cors({
  origin: '*', methods: '*', allowedHeaders: '*'
}));
app.use(express.json());
app.use(routes);

/* app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}); */

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

var server = app.listen(process.env.PORT || 8000, () =>
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  )
);
