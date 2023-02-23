const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');
var title = '';
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        include: [
            {
            model: User
            }],
        });
        // console.log(postData);
        const plainPosts = postData.map((post) => post.get({ plain: true }));
        console.log(plainPosts);
        title = 'Tech Insights Blog';
        res.render('homepage', {
            plainPosts,
            title
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;