import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Signup controller
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already registered with this email.',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: 'Account created successfully',
            success: true
        })

    } catch (error) {
        console.log('Error in Register user Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found.',
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Password doesnot match',
                success: false
            });
        }

        const TokenData = {
            userId: user._id
        }
        const token = await jwt.sign(TokenData, process.env.SECRET_KEY, { expiresIn: '10d' });

        user = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        return res.status(200).cookie("token", token, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true
        })

    } catch (error) {
        console.log('Error in Login user Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// Logout Controller
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", '', { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })        
    } catch (error) {
        console.log('Error in user Logout Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}