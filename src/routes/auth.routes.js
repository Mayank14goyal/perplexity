import { Router } from 'express';
import { register } from '../controllers/auth.controller.js';
import validator from '../middleware/auth.validator.js';

const authRouter = Router(); 

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {string} username - The username of the new user
 */

authRouter.post('/register', validator, register);

export default authRouter;
