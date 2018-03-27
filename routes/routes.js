var db = require("../models");

module.exports = function(app) {

  // Setting up our routes
  app.get("/", function(req, res) {
    db.burgers.findAll({
    }).then(function(results) {

      var hbsObject = {
        burgers: results
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });  
    
  app.post("/", function(req, res) {
    db.burgers.create({
      burger_name: req.body.name
    }).then(function(results) {
      res.redirect("/");
    });

  });

  app.put("/:id", function(req, res) {
    db.burgers.update({
      devoured:req.body.devoured
    }, {where: {id: req.params.id}}

    ).then(function(results) {
      res.redirect("/");
    });
  });
}
