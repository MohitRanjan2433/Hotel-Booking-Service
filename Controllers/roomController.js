const Room = require('../models/roomSchema');
const Hotel = require('../models/hotelSchema');

exports.createRoom = async(req,res) => {
    try{
        const { hotel, roomType, roomNumber, price, availability} = req.body;
        if(!hotel || !roomType || !roomNumber || !price){
            return res.status(400).json({
                success: false,
                message:"Missing Fields..",
            });
        }
        const room = new Room({hotel, roomType, roomNumber, price, availability});
        await room.save();

        await Hotel.findByIdAndUpdate(hotel, { $push: { rooms: room._id }});

        res.status(201).json({
            success: true,
            message: "Room Created Successfully..",
            room,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.getAllRooms = async(req, res) => {
    try{
        const rooms = await Room.find().populate('hotel');
        res.status(200).json({
            success: true,
            rooms,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

