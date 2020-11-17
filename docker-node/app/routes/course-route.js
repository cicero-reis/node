'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/course-controller');

//Curse Route
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
