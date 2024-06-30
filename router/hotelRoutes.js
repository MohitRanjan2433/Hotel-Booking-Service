const express = require('express');
const router = express.Router();

const { createHotel, getAllHotels, getHotelById, getHotelByName, updateHotel, deleteHotel } = require('../Controllers/hotelController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/createHotel', auth, isAdmin, createHotel);
router.get('/hotels', getAllHotels);
router.get('/hotel/:id', getHotelById);
router.get('/hotel', getHotelByName);
router.put('/hotel/:id', auth, isAdmin, updateHotel);
router.delete('/hotel/:id', auth, isAdmin, deleteHotel);

module.exports = router;