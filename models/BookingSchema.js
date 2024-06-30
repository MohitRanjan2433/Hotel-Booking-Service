const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    hotel:{
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required:true,
    },
    room:{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required:true,
    },
    checkin: {
        type: Date,
        required: true,
    },
    checkout: {
        type: Date,
        required: true,
    },
    totalAmount:{
        type:Number,
        required:true,
    },  
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;