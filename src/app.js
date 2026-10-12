import express from 'express';
import { hexToRgb } from './hexToRgb.js';

export const app = express();

/**
 * GET /api/hex-to-rgb?hex=336699
 * Returns RGB components, or a 400 response for invalid input.
 */
app.get('/api/hex-to-rgb', (req, res, next) => {
  try {
    const rgb = hexToRgb(req.query.hex);
    return res.status(200).json(rgb);
  } catch (error) {
    // Convert input-validation errors into readable API responses.
    if (error instanceof TypeError || error instanceof RangeError) {
      return res.status(400).json({
        error: error.message
      });
    }

    // Let Express handle unexpected errors.
    return next(error);
  }
});