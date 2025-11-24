import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '../config/index.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.isDevelopment && { stack: err.stack }),
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
