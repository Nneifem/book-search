const { User } = require ('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }, context) => {
            if (context.user) {
                return User.findOne({ _id: userId});
            }
        }
    },

    Mutation: {
        login: async(parent, {email, password}) => {
            const user = await User.findOne({ email });
            console.log("userFound:" user)

            if(!user) {
                throw AuthenticationError;
            }

            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        }, 

        addUser: async (parent, anything) => {
            console.log("addUser")
            console.log(anything)
            const user = await User.create( anything );
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(
                    { _id: bookId },
                    {
                        $addToSet: { savedBooks: bookId },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        }, 
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId }},
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;