var mongoose = require("mongoose");

var daySchema = new mongoose.Schema({
    index: Number,
    daySKU:String,
    book: String,
    englishID: String,
    spanishID: String,
    descripcion: String,
    description: String
});

module.exports = mongoose.model("Day", daySchema);
