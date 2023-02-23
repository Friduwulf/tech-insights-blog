const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'date_created'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'date_created', 'post_id'],
                }
            ],
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'date_created'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'date_created', 'post_id'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ],
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        console.log(newUser);
        res.status(200).json(newUser);
    } catch (err) {
     res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'No user with that username!' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

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