import { NextFunction, Request, Response } from 'express';
import userValidationSchema, {
  orderValidationSchema,
} from './user.zod.validation';
import { UserServices } from './user.service';
import { formatZodError } from '../../middlewares/zodErrorHandler';
import { TUser } from './user.interface';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zodPerseData = userValidationSchema.safeParse(req.body);

    if (!zodPerseData.success) {
      // short error message
      throw new Error(formatZodError(zodPerseData.error));
    }

    const result = await UserServices.createUserIntoDB(zodPerseData.data);

    if (!result) {
      throw new Error('User registration failed');
    }

    const userData: Partial<TUser> = result.toObject();
    delete userData.password;
    delete userData.orders;
    delete userData._id;
    delete userData.createdAt;
    delete userData.updatedAt;
    delete userData.__v;

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    if (!result) {
      throw new Error('User not found');
    }

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params?.userId);
    const result = await UserServices.getUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params?.userId);
    const result = await UserServices.updateUserInDB(userId, req.body);
    res.status(201).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params?.userId);
    await UserServices.deleteUserFromDB(userId);
    res.status(201).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params?.userId);

    const zodPerseData = orderValidationSchema.safeParse(req.body);

    if (!zodPerseData.success) {
      // short error message
      throw new Error(formatZodError(zodPerseData.error));
    }

    await UserServices.addNewOrderToUser(userId, zodPerseData.data);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params?.userId);
    const result = await UserServices.getAllOrdersFromUser(userId);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOrdersAmount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params?.userId);
    const result = await UserServices.getAllOrdersAmountFromUser(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getOrdersAmount,
};
