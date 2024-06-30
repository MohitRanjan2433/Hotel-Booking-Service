const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    hotel:{
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    roomType: {
        type: String,
        enum:['ac', 'non-ac', 'deluxe'],
        required: true,
    },
    roomNumber:{
        type: Number,
        required: true,
        unique:true,
    },
    price:{
        type: Number,
        required: true,
    },
    availability:{
        type: Boolean,
        required: true,
    },
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;