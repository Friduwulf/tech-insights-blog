const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

var title = '';

//Send signup handlebars
router.get('/signup', async (req, res) => {
    title = 'Sign Up';
    res.render('signup', { 
        title,
        logged_in: req.session.logged_in 
    });   
});

//Get all posts for homepage
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

//Login
router.get('/login', async (req, res) => {
    title = 'Login';
    res.render('login', { 
        title,
        logged_in: req.session.logged_in 
    });   
});
module.exports = router;