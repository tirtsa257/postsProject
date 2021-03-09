const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    nameUser: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Image'
    }]
})

module.exports = mongoose.model('users', UserSchema);