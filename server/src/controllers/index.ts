import { Router } from 'express';
import { UserController } from './userController';
import { ProductController } from './productController';

const router = Router();

// Initialize controllers
const userController = new UserController();
const productController = new ProductController();

// Setup routes
router.use('/users', userController.router);
router.use('/products', productController.router);

export default router;
