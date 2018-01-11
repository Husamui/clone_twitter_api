import mongoose, {Schema} from 'mongoose'
import { hashSync, compareSync } from 'bcrypt-nodejs'

const UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    firstname: String,
    lastname: String,
    avatar: String,
    password: String,
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
    }
}

export default mongoose.model('User', UserSchema);