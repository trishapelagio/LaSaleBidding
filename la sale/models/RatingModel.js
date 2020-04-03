var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
    rater: {
        type: String,
        required: true
    },
    rated: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Rating', UserSchema);