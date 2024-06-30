const Hotel = require('../models/hotelSchema');
const Rooms = require('../models/roomSchema');
const { find } = require('../models/userSchema');


exports.createHotel = async(req, res) => {
    try{
        const {name, location, description} = req.body;
        if(!name || !location){
            return res.status(400).json({
                success:false,
                message: "Please provide all the fields"
            });
        }

        const hotel = new Hotel({name, location, description});
        await hotel.save();
        res.status(201).json({
            success:true,
            message: "Hotel created successfully",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};

exports.getAllHotels = async(req, res) => {
    try{
        const hotels = await Hotel.find().populate('rooms');
        res.status(200).json({
            success:true,
            data: hotels,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'internal server error',
        });
    }
};

exports.getHotelById = async(req, res) => {
    try{
        const id = req.params.id;
        const hotel = await Hotel.findById(id).populate('rooms');
        if(!hotel){
            return res.status(404).json({
                success:false,
                message: "Hotel not found",
            });
        }
        res.status(200).json({
            success:true,
            data: hotel,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

exports.getHotelByName = async(req, res) => {
    try{
        const name = req.query.name;
        if(!name){
            return res.status(400).json({
                success: false,
                message: "Please provide hotel name",  
            });
        }

        const hotel = await Hotel.findOne({ name });
        if(!hotel){
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }
        res.status(200).json({
            success: true,
            data: hotel,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.updateHotel = async(req,res) => {
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!hotel){
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }
        res.status(200).json({
            success: true,
            data: hotel,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.deleteHotel = async(req, res) => {
    try{
        const id = req.params.id;
        const hotel = await Hotel.findByIdAndDelete(id);
        if(!hotel){
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Hotel deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
