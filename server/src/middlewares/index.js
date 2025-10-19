// Export tất cả các middleware từ một file duy nhất để dễ import

// Auth middlewares
export {
  authMiddleware,
  adminMiddleware,
  userOrAdminMiddleware,
  optionalAuthMiddleware,
  activeUserMiddleware,
  generateToken,
  verifyToken,
} from "./auth.js";

// Validation middlewares
export {
  validateRegister,
  validateLogin,
  validateUpdateUser,
  validateChangePassword,
  validateObjectId,
  validatePagination,
  validateSearch,
} from "./validation.js";
