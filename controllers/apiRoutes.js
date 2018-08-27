var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the ideas
  app.get("/api/pitches", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Pitch.findAll({}).then(function(dbPitch) {
      // We have access to the ideas as an argument inside of the callback function
      res.json(dbPitch);
    });
  });

  app.post("/api/pitches", function(req, res) {
    db.Pitch.create({
      text: req.body.text,
      score: req.body.score
    }).then(function(dbPitch) {
      res.json(dbPitch);
    });
  });
  
  app.put("/api/pitches", function(req, res) {
    db.Pitch.update(
      {
        score: req.body.score
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbPitch) {
      res.json(dbPitch);
    });
  });
};
