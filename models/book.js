var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name: String,
    author : String,
    year : Number,
    subject : String,
    statusJP : String,
    jpNotes : String,
    goodreadsUrl : String,
    grRating : Number,
    jpRating : Number,
    recommendations : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor"
        }
    ]

});

module.exports = mongoose.model("Book", bookSchema);