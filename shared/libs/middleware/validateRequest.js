import { z } from 'zod';

/**
 * Middleware factory for request validation using Zod schemas.
 * 
 * @param {object} schema - The Zod schema object containing optional body, query, and params schemas.
 * @param {z.ZodSchema} [schema.body] - Zod schema for validating request body.
 * @param {z.ZodSchema} [schema.query] - Zod schema for validating request query parameters.
 * @param {z.ZodSchema} [schema.params] - Zod schema for validating request path parameters.
 * @returns {import('express').RequestHandler} Express middleware function.
 */
const validateRequest = (schema) => async (req, res, next) => {
  try {
    if (schema.body) {
      req.body = await schema.body.parseAsync(req.body);
    }
    if (schema.query) {
      req.query = await schema.query.parseAsync(req.query);
    }
    if (schema.params) {
      req.params = await schema.params.parseAsync(req.params);
    }
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: error.errors,
      });
    }
    next(error);
  }
};

export default validateRequest;
