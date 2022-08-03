const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

const create = async (data) => {
    const { imageUrl, userId, description } = data;

    const user = await User.findOne({ _id: userId });
    if (!user) throw { error: { message: "User not found" } };

    const post = new Post({ imageUrl, owner: userId, description });

    user.posts.push(post);
    await user.save();

    return await post.save();
};

const getAll = async (data) => {
    const { imageUrl, userId, description } = data;

    let posts = await Post.find().populate({ path:
         'owner', select: 'username' }).populate({ path:
             'comments', populate: { path: 'user' } }).lean();
    console.log(posts);


    return posts;
};

const likePost = async (data) => {
    const { _id, userId } = data;

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id });

    if (post.usersLiked.includes(userId)) {
        post.usersLiked.remove(user);
        return await post.save();
    }

    post.usersLiked.push(user);

    return await post.save();
};

const savePost = async (data) => {
    const { _id, userId } = data;

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id });

    let isSaved = user.savedPosts.some(x => x._id == _id);
    if (isSaved) {
        await user.savedPosts.remove(post);
        return await user.save();
    }

    user.savedPosts.push(post);
    return await user.save();
};

const addComment = async (data) => {
    const { postId, userId, comment: content } = data;

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id: postId });

    let dbComment = new Comment({ user, post, content });
    await dbComment.save();
    post.comments.push(dbComment);
    return await post.save();
};

module.exports = {
    getAll,
    create,
    savePost,
    likePost,
    addComment,
};