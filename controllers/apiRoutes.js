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

  // POST route for saving a new idea. We can create a todo using the data on req.body
  app.post("/api/pitches", function(req, res) {
    db.Pitch.create({
      text: req.body.text,
      score: req.body.score
    }).then(function(dbPitch) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbPitch);
    });
  });

};
