import mongoose, {Schema}from 'mongoose'

const PostSchema = new Schema({
    text: {
        type: String,
        minlength: [5, 'Text to short'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

export default mongoose.model('Post', PostSchema);