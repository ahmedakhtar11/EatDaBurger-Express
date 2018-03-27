// Require Express
var express = require('express');
// Require body-parser
var bodyParser = require('body-parser');
// Require method-override
var methodOverride = require("method-override");
// Require Handlebars
var exphbs = require("express-handlebars");

var app = new express();
// Set Port
var PORT = process.env.PORT||3000;

// Require Models
var db = require("./models");

// Serve static content from the "public" folder.
app.use(express.static(process.cwd() + "/public"));

// bodyparser urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override POST 
app.use(methodOverride("_method"));

// Setting HandleBars Requirement with main as the default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Setting up the View Engine for HandleBars
app.set("view engine", "handlebars");

// Setting the Routes
require("./routes/routes.js")(app);

// Setting up Sequelize
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});