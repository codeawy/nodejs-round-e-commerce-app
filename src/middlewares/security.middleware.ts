import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * CORS configuration middleware
 * Restricts which domains can access your API
 */
export const corsConfig: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  // Set allowed origins based on environment
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? ["https://yourdomain.com", "https://www.yourdomain.com"]
      : ["http://localhost:3000"];

  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // ** M-Custom-Header (unknown header)

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
};
