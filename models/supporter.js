var mongoose = require("mongoose");

var supporterSchema = new mongoose.Schema({
    name: String,
    email: String,
    language: String,
})

module.exports = mongoose.model("Supporter", supporterSchema);