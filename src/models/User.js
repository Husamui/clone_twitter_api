import mongoose, {Schema} from 'mongoose'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import constants from '../config/constants';

const UserSchema = new Schema({
    username: { type: String, unique: true },
    firstname: String,
    lastname: String,
    avatar: String,
    title: String,
    password: String,
    bio: String,
    location: String,
    interests: [String],
    connections: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        // select: false
    }
}, {timestamps: true});

UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

UserSchema.methods = {
    _hashPassword(password){
        return hashSync(password);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    createToken() {
        const token = jwt.sign(
            {
                _id: this._id
            },
            constants.JWT_SECRECT
        )
        return token
    }

}


export default mongoose.model('User', UserSchema);