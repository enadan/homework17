// Require/import the HTTP module
var http = require("http");
var fs = require("fs");
var express = require("express");
let db = require("./models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = 8080;

var seed = require("./seeders/seed.js")

app.use(express.static('public'))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/exercise", function(req, res) {
  res.sendFile(__dirname + "/public/exercise.html");
});

app.get("/stats", function(req, res) {
  res.sendFile(__dirname + "/public/stats.html");
});

app.get("/api/workouts/range", function(req, res) {
  db.Workout.find({})
    .then(data => {
      data.forEach(workout => {
        workout.totalDuration = 0;
        workout.exercises.forEach(exercise => {
          workout.totalDuration += exercise.duration;
        }); 
      });

      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", function(req, res) {
  req.body.day = new Date();
  db.Workout.create(req.body)
  .then(data => {
    console.log(data);
    res.json(data);
  })
  .catch(({ message }) => {
    console.log(message);
  });
});

app.put("/api/workouts/:id", function(req, res) {

  db.Workout.find({})
    .then(data => {
      const lastWorkout = data[data.length - 1];
      lastWorkout.exercises.push(req.body);
      console.log(lastWorkout);

      db.Workout.findByIdAndUpdate(lastWorkout._id, lastWorkout, { new: true }, function (err, model) {
        if (err) { throw err; }
        res.json(req.body);
      });

    });
});

app.get("/api/workouts", function(req, res) {
  db.Workout.find({})
    .then(data => {
      data.forEach(workout => {
        workout.totalDuration = 0;
        workout.exercises.forEach(exercise => {
          workout.totalDuration += exercise.duration;
        }); 
      });

      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, function() {

  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
