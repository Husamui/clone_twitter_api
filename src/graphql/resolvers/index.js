import graphQLDate from 'graphql-date'
import TweetResolvers from './tweet-resolvers';

export default {
    Date: graphQLDate,
    Query: {
        getTweet: TweetResolvers.getTweet,
        getTweets: TweetResolvers.getTweets
    },
    Mutation: {
        createTweet: TweetResolvers.createTweet,
        updateTweet: TweetResolvers.updateTweet,
        deleteTweet: TweetResolvers.delateTweet
    }
}