const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

var title = '';

//-----------------Dashboard-----------------//
//Get User Posts
router.get('/dashboard', withAuth, async (req, res) => {
    try{
        const postData = await Post.findAll({
            where:{
                user_id: req.session.user_id
            },
        });
        const plainUserPosts = postData.map((post) => post.get({ plain: true }));
        console.log(plainUserPosts);
        title = 'Dashboard';
        res.render('dashboard', {
            plainUserPosts,
            title,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.findOne({
            where:{
                id: req.params.id
            },
            include: [{model: User}],
        });
        console.log(postData);
        const post= postData.get({ plain: true });
        title = 'Dashboard';
        res.render('editpost', {
            title,
            logged_in: req.session.logged_in,
            post
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get()

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

//-----------------Login-----------------//
//Login page load
router.get('/login', async (req, res) => {
    title = 'Login';
    res.render('login', { 
        title,
        logged_in: req.session.logged_in 
    });   
});

//Route for failed login
router.get('/login', async (req, res) => {
    title = 'Login';
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('login', { 
        title,
        message: 'Failed to log in'
    });
});

//Route for login credentials and validation
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username!' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//-----------------Logout-----------------//
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;