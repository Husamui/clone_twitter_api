export default`

    scalar Date

    type auth {
        token: String
        newUser: Boolean
    }
    type Status {
        message: String
    }
    type Tweet {
        _id: String
        text: String
        user: User!
        favoriteCount: Int!
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
        title: String
        bio: String
        location: String
        interests: [String]
        connections: [User]
        createdAt: Date
        updatedAt: Date
    }
    type Me {
        _id: String
        username: String
        email: String
        firstname: String
        lastname: String
        avatar: String
        title: String
        location: String
        bio: String
        connections: [User]
        interests: [String]
        createdAt: Date
        updatedAt: Date
    }
    type Query {
        getTweet(_id: ID!): Tweet
        getTweets: [Tweet]
        getUserTweets: [Tweet]
        getUsers: [User]
        me: Me
    }
    type Mutation {
        createTweet(text: String!): Tweet
        updateTweet(_id: ID!, text: String): Tweet
        deleteTweet(_id: ID!): Status
        signup(fullname: String, username: String, email: String, avatar: String, password: String): auth
        login(email: String, password: String): auth
        login(email: String, password: String): auth
        updateUser(fullName: String, title: String, location: String, bio: String, interests: [String]): User
        facebookAuth(access_token: String): auth
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;