const express = require('express');
const router = express.Router();

const { createBooking, deleteBooking } = require("../Controllers/bookingController");
const { auth, isAdmin } = require("../middleware/auth");

router.post('/createbooking', auth, isAdmin, createBooking);
router.delete('/deletebooking/:id', auth, isAdmin, deleteBooking);

module.exports = router;
