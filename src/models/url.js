const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    urlHashCode: String,
    url: String,
    shortUrl: String
});

module.exports = mongoose.model("url", urlSchema);