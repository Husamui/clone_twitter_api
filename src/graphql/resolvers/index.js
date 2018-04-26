import graphQLDate from 'graphql-date'
import PostResolvers from './post-resolvers';
import UserResolvers from './user-resolvers';
import User from '../../models/User';


export default {
    
    Date: graphQLDate,
    Post: {
        user: ({user}) => User.findById(user)
    },
    Query: {
        getPost: PostResolvers.getPost,
        getPosts: PostResolvers.getPosts,
        getUserPosts: PostResolvers.getUserPosts,
        getMyPosts: PostResolvers.getMyPosts,
        getUsers: UserResolvers.getUsers,
        getUser: UserResolvers.getUser,
        me: UserResolvers.me
    },
    Mutation: {
        createPost: PostResolvers.createPost,
        updatePost: PostResolvers.updatePost,
        deletePost: PostResolvers.delatePost,
        signup: UserResolvers.signup,
        login: UserResolvers.login,
        updateUser: UserResolvers.updateUser,
        facebookAuth: UserResolvers.facebookAuth,
    }
}