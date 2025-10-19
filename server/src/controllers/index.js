import { Router } from 'express';
import { UserController } from './userController.js';
import { AuthController } from './authController.js';

const router = Router();

// Initialize controllers
const userController = new UserController();
const authController = new AuthController();

// Setup routes
router.use('/users', userController.router);
router.use('/auth', authController.router);

export default router;
