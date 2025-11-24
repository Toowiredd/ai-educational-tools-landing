import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { RegisterInput, LoginInput, RefreshTokenInput } from '../schemas/auth.schemas.js';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
  /**
   * Register new user
   * POST /api/auth/register
   */
  static async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    const result = await AuthService.register(email, password, firstName, lastName);

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
      message: 'User registered successfully',
    });
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  static async login(req: Request<{}, {}, LoginInput>, res: Response) {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: 'Login successful',
    });
  }

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  static async refresh(req: Request<{}, {}, RefreshTokenInput>, res: Response) {
    const { refreshToken } = req.body;

    const result = await AuthService.refreshToken(refreshToken);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: 'Token refreshed successfully',
    });
  }

  /**
   * Logout user
   * POST /api/auth/logout
   */
  static async logout(req: Request, res: Response) {
    const userId = req.user!.userId;
    const { refreshToken } = req.body;

    const result = await AuthService.logout(userId, refreshToken);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: 'Logout successful',
    });
  }

  /**
   * Get current user
   * GET /api/auth/me
   */
  static async me(req: Request, res: Response) {
    const user = req.user!;

    res.status(StatusCodes.OK).json({
      success: true,
      data: { user },
    });
  }
}
