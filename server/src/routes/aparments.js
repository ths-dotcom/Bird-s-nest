const express = require('express');
const router = express.Router();
const apartmentController = require('../app/controllers/ApartmentController');

router.get('/types/:slugName', apartmentController.typeDetail);
router.get('/types', apartmentController.types);
router.get('/all-count', apartmentController.allCount);
router.get('/:slugName', apartmentController.detail);
router.get('/', apartmentController.showAll);

module.exports = router;