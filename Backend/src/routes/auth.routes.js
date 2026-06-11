import { Router } from 'express';
import { getMe, register, verifyEmail, login } from '../controllers/auth.controller.js';
import validator from '../validator/auth.validator.js';
import { authUser } from '../middleware/auth.middleware.js';

const authRouter = Router(); 

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {string} username - The username of the new user
 */
authRouter.post('/register', validator, register);

/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 * @access Public
 * @body {string} email - The email of the user
 * @body {string} password - The password of the user
*/
authRouter.post('/login', login);

/**
 * @route GET /api/auth/get-me
 * @desc get current loged in user details
 * @access private
 */
authRouter.get("/get-me",authUser,getMe)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */
authRouter.get('/verify-email', verifyEmail);

export default authRouter;
