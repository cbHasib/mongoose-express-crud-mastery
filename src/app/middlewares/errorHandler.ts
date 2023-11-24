import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

// Error Handler
const errorHandler: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message || err.error,
    error: {
      code: err.status || 500,
      description: err.error || err.message,
    },
  });
};

export default errorHandler;
