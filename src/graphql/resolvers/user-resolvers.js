
import User from '../../models/User';


export default {
    signup: (_, {fullname, ...rest}) => {
        const [firstname, ...lastname] = fullname.split(' ');
        return User.create({firstname, lastname, ...rest})
    },
    login: async (_, {email, password}) => {
        const user = await User.findOne({email});

        if(!user) {
            throw new Error('User not exist!');
        }
        if(!user.authenticateUser(password)) {
            throw new Error('Password not match!');
        }
        return user;
    }
}