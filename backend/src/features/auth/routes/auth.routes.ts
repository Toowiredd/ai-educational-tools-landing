import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validate } from '../../../middleware/validate.middleware.js';
import { authenticate } from '../../../middleware/auth.middleware.js';
import { registerSchema, loginSchema, refreshTokenSchema } from '../schemas/auth.schemas.js';
import { asyncHandler } from '../../../utils/async-handler.js';

const router = Router();

// Public routes
router.post('/register', validate(registerSchema), asyncHandler(AuthController.register));
router.post('/login', validate(loginSchema), asyncHandler(AuthController.login));
router.post('/refresh', validate(refreshTokenSchema), asyncHandler(AuthController.refresh));

// Protected routes
router.post('/logout', authenticate, asyncHandler(AuthController.logout));
router.get('/me', authenticate, asyncHandler(AuthController.me));

export default router;
