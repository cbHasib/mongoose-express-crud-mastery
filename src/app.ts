import express, { Request, Response, NextFunction } from 'express';
const app = express();
import cors from 'cors';
import errorHandler from './app/middlewares/errorHandler';
import createHttpError from 'http-errors';
import { UserRoutes } from './app/modules/user/user.route';

// parser
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Welcome to express typescript mongoose mastery REST API',
    data: null,
  });
});

// Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound('This route does not exist'));
});

// Error Handler
app.use(errorHandler);

export default app;
