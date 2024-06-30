const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    rooms:[
        {
            type:Schema.Types.ObjectId,
            ref:'Room',
        },
    ]
});

const Hotel = mongoose.model('Hotel', HotelSchema);
module.exports = Hotel;
