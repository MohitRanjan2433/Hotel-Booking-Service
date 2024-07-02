const Booking = require("../models/BookingSchema");
const Hotel = require('../models/hotelSchema');
const Room = require("../models/roomSchema");
const User = require("../models/userSchema");

exports.createBooking = async (req, res) => {
    try {
        const { user, hotel, room, checkin, checkout, totalAmount } = req.body;

        // Validate required fields
        if (!user || !hotel || !room || !checkin || !checkout || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: user, hotel, room, checkin, checkout, totalAmount"
            });
        }

        // Check if user exists
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if hotel exists
        const hotelExists = await Hotel.findById(hotel);
        if (!hotelExists) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        // Check if room exists
        const roomExists = await Room.findById(room);
        if (!roomExists) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        if(roomExists.price > totalAmount){
            return res.status(404).json({
                success:false,
                message:"Inserted Amount is less than the price of room"
            });
        }

        // Check if the room is already booked for the requested dates
        const existingBooking = await Booking.findOne({
            room: room,
            $or: [
                { checkin: { $lt: new Date(checkout) }, checkout: { $gt: new Date(checkin) } },
                { checkin: { $gte: new Date(checkin), $lt: new Date(checkout) } },
                { checkout: { $gt: new Date(checkin), $lte: new Date(checkout) } }
            ]
        });

        if (existingBooking) {
            return res.status(409).json({
                success: false,
                message: "Room is already booked for the specific dates"
            });
        }

        // Create new booking
        const newBooking = new Booking({
            user: userExists._id,
            hotel: hotelExists._id,
            room: roomExists._id,
            checkin: new Date(checkin),
            checkout: new Date(checkout),
            totalAmount: totalAmount
        });

        const savedBooking = await newBooking.save();

        // Update room availability
        roomExists.availability = false;
        await roomExists.save();

        // Schedule room availability update after checkout date
        const today = new Date();
        const milliSecondsInADay = 24 * 60 * 60 * 1000;
        const daysUntilCheckout = Math.round((new Date(checkout) - today) / milliSecondsInADay);

        setTimeout(async () => {
            roomExists.availability = true;
            await roomExists.save();
        }, daysUntilCheckout * milliSecondsInADay);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: savedBooking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.deleteBooking = async(req,res) => {
    try{
        const bookId = req.params.id;
        const existingBooking = await Booking.findByIdAndDelete(bookId);
        if(!existingBooking){
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });
    }catch(error){
        console.error("Error deleting booking:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};