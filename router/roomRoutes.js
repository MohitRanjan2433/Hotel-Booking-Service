const express = require('express');
const router = express.Router();

const {createRoom, getAllRooms} = require("../Controllers/roomController");
const { auth, isAdmin } = require('../middleware/auth');

router.post('/createroom', auth, isAdmin, createRoom);
router.get('/rooms', getAllRooms);


module.exports = router;
