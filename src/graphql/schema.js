export default`

    scalar Date

    type Status {
        message: String
    }
    type Tweet {
        _id: String
        text: String
        createdAt: Date
        updatedAt: Date
    }
    type User {
        _id: String
        username: String
        email: String
        firstname: String
        lastname: String
        avatar: String
        createdAt: Date
        updatedAt: Date
    }
    type Query {
        getTweet(_id: ID!): Tweet
        getTweets: [Tweet]
    }
    type Mutation {
        createTweet(text: String!): Tweet
        updateTweet(_id: ID!, text: String): Tweet
        deleteTweet(_id: ID!): Status
        signup(fullname: String, username: String, email: String, avatar: String, password: String): User
        login(email: String, password: String): User
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;