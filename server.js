const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

const user = require("./router/userRoutes");
const hotel = require("./router/hotelRoutes");
const room = require("./router/roomRoutes");
app.use('/user', user);
app.use('/hotel', hotel);
app.use('/room', room);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})