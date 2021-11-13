const express = require('express');
const router = express.Router();
const apartmentController = require('../app/controllers/ApartmentController');

router.get('/all-count', apartmentController.allCount);
router.get('/', apartmentController.showAll);

module.exports = router;