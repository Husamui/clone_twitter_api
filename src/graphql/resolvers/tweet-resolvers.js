
import Tweet from '../../models/Tweet';


export default {
    getTweet: (_, {_id}) => Tweet.findById(_id),
    getTweets: () => Tweet.find({}),
    createTweet: (_, args) => Tweet.create(args),
    updateTweet: (_, { _id, ...rest }) => Tweet.findByIdAndUpdate(_id, rest, {new: true})
}