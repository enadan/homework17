const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    reps: {
        type: Number,
        default: 0
    },
    sets: {
        type: Number,
        default: 0
    },
    distance: {
        type: Number,
        default: 0
    }
});

const WorkoutSchema = new Schema({
    day : Date,
    totalDuration:  {
        type: Number,
        default: 0
    },
    exercises: [ExerciseSchema]
    // id: String,
    // day: {
    //     type: Date,
    //     // required: "Need type"
    // },
    // exercises: [
    //     {
    //         type: String,
    //         name: String,
    //         // duration: Number,
    //         // weight: Number,
    //         // reps: Number,
    //         // sets: Number,
    //         // distance: Number
    //     }
    // ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
