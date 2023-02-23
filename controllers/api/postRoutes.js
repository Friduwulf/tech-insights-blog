const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 
                        'comment_text', 
                        'date_created',
                        'user_id'
                    ]
            }],
        });
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);        
    }
});

router.get('/activePost', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk({
            where: {
                id: req.session.activePostId,
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 
                        'comment_text', 
                        'date_created',
                        'user_id'
                    ]
            }],
        });
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);        
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!updatePost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);        
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);        
    }
});


module.exports = router;