const express = require('express'),
    router = express.Router(),
    blogController = require('../controllers/blogController');


router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.get('/create', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

router.put('/:id', blogController.blog_update);

module.exports = router;