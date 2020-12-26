var mongoose = require("mongoose");

var mentorSchema = new mongoose.Schema({
    name: String,
    platform : String,
    link : String,
    comments : String
});

module.exports = mongoose.model("Mentor", mentorSchema);