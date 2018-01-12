import graphQLDate from 'graphql-date'
import TweetResolvers from './tweet-resolvers';
import UserResolvers from './user-resolvers';

export default {
    Date: graphQLDate,
    Query: {
        getTweet: TweetResolvers.getTweet,
        getTweets: TweetResolvers.getTweets,
        me: UserResolvers.me
    },
    Mutation: {
        createTweet: TweetResolvers.createTweet,
        updateTweet: TweetResolvers.updateTweet,
        deleteTweet: TweetResolvers.delateTweet,
        signup: UserResolvers.signup,
        login: UserResolvers.login,
       
    }
}