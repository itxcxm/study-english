import { Router } from 'express';
import { UserController } from './userController.js';
import { AuthController } from './authController.js';
import { ReviewController } from './reviewController.js';
const router = Router();

// Initialize controllers
const userController = new UserController();
const authController = new AuthController();
const reviewController = new ReviewController();
// Setup routes
router.use('/users', userController.router);
router.use('/auth', authController.router);
router.use('/review', reviewController.router);
export default router;
