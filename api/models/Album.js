const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    artist : {
        type : String,
        required : true
    },

    genre : {
        type : String,
        required : true
    },

    releaseDate : {
        type : String,
        required : true
    },

},

{timestamps : true}
);

module.exports = mongoose.model("Album", AlbumSchema);