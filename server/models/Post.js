const mongoose = require('mongoose');

const postScheme = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    usersLiked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Post', postScheme);