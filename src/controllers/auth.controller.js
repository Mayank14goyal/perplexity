import userModel from "../models/user.models.js";
import { sendEmail } from "../services/mail.services.js";

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

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity",
        text: `Hello ${username}, welcome to Perplexity! We're glad to have you on board.`,
        html: `<p>Hello <strong>${username}</strong>, welcome to Perplexity! We're glad to have you on board.<br>Best regards,<br>The Perplexity Team   </p>`
    });

    return res.status(201).json({
        message: "User registered successfully",
        success: true,
    })
}