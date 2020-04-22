// Code is an adapted version of 2 tutorials by bezkoder
// The code in his tutorial has been adapted to fit my project but may contain some similarities
// Tutorial 1 can be accessed at https://bezkoder.com/node-js-jwt-authentication-mysql/
// Tutorial 2 can be accessed at https://bezkoder.com/node-js-express-sequelize-mysql/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const db = require("./models");
const Role = db.role;
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Adam Noone's assignment." });
});

require("./routes/pub.routes")(app);
require("./routes/review.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


