const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        include: [
            {
            model: User
            }],
        });
        console.log(postData);
        const plainPosts = postData.map((post) => post.get({ plain: true }));
        console.log(plainPosts);
        res.render('homepage', {
            plainPosts
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


module.exports = router;