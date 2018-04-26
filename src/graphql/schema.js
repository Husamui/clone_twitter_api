export default`

    scalar Date

    type auth {
        token: String
        newUser: Boolean
    }
    type Status {
        message: String
    }
    type Post {
        _id: String
        text: String
        user: User!
        likesCount: Int!
        commentsCount: Int!
        me: Boolean!
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
        getPost(_id: ID!): Post
        getPosts: [Post]
        getMyPosts: [Post]
        getUserPosts(_id: String): [Post]
        getUsers: [User]
        getUser(_id: String!): User
        me: Me
    }
    type Mutation {
        createPost(text: String!): Post
        updatePost(_id: ID!, text: String): Post
        deletePost(_id: ID!): Status
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