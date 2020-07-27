const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisLikeSchema = mongoose.Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
}, {timestemps : true })



const DisLike = mongoose.model('DisLike', DisLikeSchema);

module.exports = { DisLike }