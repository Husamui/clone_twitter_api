export default`
    type Tweet {
        _id: String
        text: String
    }
    type Query {
        getTweet(_id: ID!): Tweet
        getTweets: [Tweet]
    }
    type Mutation {
        createTweet(text: String!): Tweet
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;