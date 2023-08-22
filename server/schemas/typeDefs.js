const typeDefs = `
    type Query {
        user: User
        users: [User]
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
    input BookInput{ bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String}

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;