import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../features/auth/services/auth.service.js';
import { StatusCodes } from 'http-status-codes';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const payload = AuthService.verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Role-based authorization middleware
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};
