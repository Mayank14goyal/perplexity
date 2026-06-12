import userModel from "../models/user.models.js";
import { sendEmail } from "../services/mail.services.js";
import jwt from "jsonwebtoken";


/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */

export async function register(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ] 
    });

    if (isUserAlreadyExist) {
        return res.status(400).json({ 
            message: "User with this email or username already exists" ,
            success: false,
            error: "User already exists"
        });
    }

    const user =  await userModel.create({ username, email, password });

    const emailVarificationToken =jwt.sign(
        {email: user.email},
        process.env.JWT_SECRET,
    );


    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity",
        html: `
            <p>Hello ${username}, welcome to Perplexity! We're glad to have you on board.</p>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${emailVarificationToken}">Verify Email</a>
            <br><br>
            <p>Hello <strong>${username}</strong>, welcome to Perplexity! We're glad to have you on board.<br>Best regards,<br>The Perplexity Team   </p>
            <p>If you did not sign up for a Perplexity account, please ignore this email.</p>`
    });

    return res.status(201).json({
        message: "User registered successfully",
        success: true,
        user:{
            id: user._id,
            verified: user.verified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    })
}

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */

export async function verifyEmail(req, res) {
        const { token } = req.query;
        try {     
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findOne({ email: decoded.email });
            if (!user) {
                return res.status(400).json({
                    message: "Invalid token",
                    success: false,
                    error: "User not found"
                });
            }
            user.verified = true;
            await user.save();
            const html = `
                <h1>Your email has been verified successfully!</h1>
                <p>Welcome to Perplexity,Mr/Mrs ${user.username}!</p>
                <a href="http://localhost:3000/login">Login to your account </a>
            `;
            return res.send(html);
        } catch (err) {
            return res.status(400).json({
                message: "Invalid or expired token",
                success: false,
                error: "Invalid token"
            });
        }
}


/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 * @access Public
 * @body {string} email - The email of the user
 * @body {string} password - The password of the user
*/

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email ",
            success: false,
            error: "User not found"
        });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Invalid password",
            success: false,
            error: "Invalid credentials"
        });
    }

    if(!user.verified){
        return res.status(400).json({
            message:"please verify your email before logging",
            success: false,
            err: "incorrect password"
        })
    }

    const token = jwt.sign({ 
        id: user._id, 
        username: user.username},
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token)

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    });
}

export async function getMe(req,res){
    const userID = req.user.id;

    const user = await userModel.findById(userID).select("-password")

    if(!user){
        return res.status(404).json({
            message:"user not found",
            statuse: false,
            err: "use not foune"
        })
    }

    res.status(200).json({
        message:"user details fatched successfully",
        sucess: true,
        user
    })
}