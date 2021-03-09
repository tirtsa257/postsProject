const mongoose = require('mongoose')
const ImageSchema = mongoose.Schema({

    userId: {
        type: Number,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    title: {
        type: String
    },
    body: {
        type: String,
        require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }

})
module.exports = mongoose.model('Image', ImageSchema);