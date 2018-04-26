import { forEach } from 'lodash';
import Post from '../../models/Post';
import { requireAuth } from '../../services/auth'

export default {
    getPost: async (_, {_id}, {user}) => {
        try {
            await requireAuth(user);
            return Post.findById(_id)
        } catch (err) {
            throw err;
        }
    },
    getPosts: async (_, args, {user}) => { 
        try {
            const me = await requireAuth(user);
            const posts = await Post.find({}).sort({createdAt: -1});
            await forEach(posts, post => {
                post.me = (String(post.user) == me._id);
                return post;
            })
            return posts
        } catch (err) {
            throw err;
        }
    },
    getMyPosts: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            return await Post.find({user: user._id}).sort({createdAt: -1});
        } catch (err) {
            throw err;
        }
    },
    getUserPosts: async (_, {_id}, {user}) => {
        try {
            await requireAuth(user);
            return await Post.find({user: _id}).sort({createdAt: -1});
        } catch (err) {
            throw err;
        }
    },
    createPost: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            return Post.create({...args, user: user._id})
        } catch (err) {
            throw err;
        }
    },
    updatePost: async (_, { _id, ...rest }, {user}) => {
        try {
            await requireAuth(user);
            const UpdatPost = await Post.findOne({_id, user: user._id});
            if(!UpdatPost) {
                throw new Error('Post not found');
            }
            Object.entries(rest).forEach(( [key, value] ) => {
                UpdatPost[key] = value;
            });
            return Post.save();
        } catch (err) {
            throw err;
        }
        
    },
    delatePost: async (_, { _id }, {user}) => {
        try {
            await requireAuth(user);
            const Post = await Post.findOne({_id, user: user._id});
            if(!Post) {
                throw new Error('Post not found');
            }
            await Post.remove();
            return {message: 'Post has been removed successfully'}
        } catch (err) {
            throw err
        }
    }
}