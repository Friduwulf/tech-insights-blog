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

module.exports = router;