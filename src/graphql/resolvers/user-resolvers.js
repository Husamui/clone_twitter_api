import User from '../../models/User';
import { requireAuth } from '../../services/auth'
import FB from '../../config/FB'

const fb = new FB();

export default {
    facebookAuth: async (_, { access_token }) => {
        try {
            const fbResponse = await fb.call('me', { access_token, fields: 'id,name,email' });
            const fbProfile = JSON.parse(fbResponse);
            
            let user = await User.findOne({'facebookProvider.id': fbProfile.id})

            if(!user){
                const [firstname, ...lastname] = fbProfile.name.split(' ');
                const userToSave = {
                    email: fbProfile.email,
                    username: fbProfile.email,
                    firstname,
                    lastname,
                    facebookProvider: {
                        id: fbProfile.id,
                        token: access_token
                    },
                }
                user = await User.create(userToSave)
            }
            return {token: user.createToken(), newUser: true}

        } catch (err) {
            throw err
        }
    },
    signup: async (_, {fullname, ...rest}) => {
        try {
            const [firstname, ...lastname] = fullname.split(' ');
            const user =  await User.create({firstname, lastname, ...rest})
            return { token: user.createToken() };
        } catch (err) {
            throw err
        }
    },
    login: async (_, {email, password}) => {
        try {

            const user = await User.findOne({email});
            if(!user) {
                throw new Error('User not exist!');
            }
            if(!user.authenticateUser(password)) {
                throw new Error('Password not match!');
            }
            return {token: user.createToken()};

        } catch (err) {
            throw err
        }
    },
    me: async (_, args, {user}) => {
        try {
            const me = await requireAuth(user);
            me.avatar = `https://graph.facebook.com/${me.facebookProvider.id}/picture?type=large`
            return me;
        } catch (err) {
            throw err
        }
    },
    updateUser: async (_, args, { user }) => {
        try {
            const { fullName, ...rest } = args;
            const DbUser = await requireAuth(user);

            console.log(rest.interests)
            if (fullName) {
                const [firstname, ...lastname] = fullName.split(' ');
                DbUser.firstname = firstname
                DbUser.lastname = lastname
            }
            Object.entries(rest).forEach(( [key, value] ) => {
                if(value.length) {
                    DbUser[key] = value;
                }
            });
            const newUser = await DbUser.save();
            newUser.avatar = `https://graph.facebook.com/${newUser.facebookProvider.id}/picture?type=large`
            return newUser;
        } catch (err) {
            throw err
        }
    },
    getUsers: async(_, args, {user}) => {
        try {
            await requireAuth(user);
            const users = await User.find({});
            users.forEach(mentor => (mentor.avatar = `https://graph.facebook.com/${mentor.facebookProvider.id}/picture?type=large`))
            // me.avatar = `https://graph.facebook.com/${me.facebookProvider.id}/picture?type=large`
            return users;
        } catch (err) {
            throw err
        }
    }
}