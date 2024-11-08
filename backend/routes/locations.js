const express = require('express');
const { requireAuthentication } = require('../middleware/auth');
const { getNearest, getAmenities } = require('../controllers/locationsController');


const router = express.Router();

router.use(requireAuthentication);

router.get('/nearest', getNearest);
router.get('/amenities', getAmenities);
router.get('/amenities/:id', getAmenities);


module.exports = router;
