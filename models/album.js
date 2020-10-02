var mongoose = require("mongoose");

var albumSchema = new mongoose.Schema({
    index: Number,
    name: String,
    artist: String,
    date: String,
    year: Number,
    image: String,
    spotifyLink: String,
    youtubeLink: String,
    discogsLink: String,
    wikipediaLink: String,
    description: String
});

module.exports = mongoose.model("Album", albumSchema);