import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

/**
 * Validation middleware using Zod schemas
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }

      next(error);
    }
  };
};
