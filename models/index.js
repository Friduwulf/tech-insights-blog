const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const UserComment = require('../models/UserComment');
const UserPost = require('../models/UserPost');
const PostComment = require('../models/PostComment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    through: {
        model: UserComment,
    }
});

Comment.belongsTo(Post, {
    through: {
        model: PostComment,
    }
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});


Post.belongsTo(User, {
    through: {
        model: UserPost,
    }
});

module.exports = { 
    User, 
    Post, 
    Comment, 
    UserComment, 
    UserPost, 
    PostComment 
};