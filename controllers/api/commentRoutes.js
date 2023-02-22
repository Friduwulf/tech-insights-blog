const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Post,
                    attributes: ['title']
                }],
            });
        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['title']
            }],
        });
        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

module.exports = router;
