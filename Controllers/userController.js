const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Please fill all the fields'
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        const user = await User.create({
            name, email, password: hashedPassword
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Fields req. for login"
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        const payload = {
            name: user.name,
            email: user.email,
            id: user._id,
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("hotelCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Login Successful"
            });

        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure',
        });
    }
}
