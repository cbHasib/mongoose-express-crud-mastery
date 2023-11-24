import createHttpError from 'http-errors';
import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExist(user.userId)) {
    throw new Error('User already exist');
  }

  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({})
    .select('-_id username fullName age email address')
    .sort({ createdAt: -1 });
  return result;
};

const getUserFromDB = async (userId: number) => {
  const ifUserExist = await User.isUserExist(userId);

  if (!ifUserExist) {
    throw createHttpError.NotFound('User not found');
  }

  const result = await User.findOne({ userId }).select(
    '-_id userId username fullName age email isActive hobbies address',
  );

  if (!result) {
    throw createHttpError.NotFound('User not found');
  }

  return result;
};

const updateUserInDB = async (userId: number, user: Partial<TUser>) => {
  const ifUserExist = await User.isUserExist(userId);

  if (!ifUserExist) {
    throw createHttpError.NotFound('User not found');
  }

  const userData = await User.findOneAndUpdate({ userId }, user, {
    new: true,
  }).select('-_id userId username fullName age email isActive hobbies address');

  return userData;
};

const deleteUserFromDB = async (userId: number) => {
  const ifUserExist = await User.isUserExist(userId);

  if (!ifUserExist) {
    throw createHttpError.NotFound('User not found');
  }

  return await User.deleteOne({ userId });
};

const addNewOrderToUser = async (userId: number, order: TOrder) => {
  const ifUserExist = await User.isUserExist(userId);

  if (!ifUserExist) {
    throw createHttpError.NotFound('User not found');
  }

  const updateRes = await User.findOne({ userId }).updateOne({
    $push: { orders: order },
  });
  return updateRes;
};

const getAllOrdersFromUser = async (userId: number) => {
  const ifUserExist = await User.isUserExist(userId);

  if (!ifUserExist) {
    throw createHttpError.NotFound('User not found');
  }

  const orders = await User.findOne({ userId }).select('-_id orders');
  return orders;
};

const getAllOrdersAmountFromUser = async (userId: number) => {
  const ifUserExist = await User.isUserExist(userId);

  if (!ifUserExist) {
    throw createHttpError.NotFound('User not found');
  }

  const ordersGroup = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$userId',
        // round two decimal places (sum: price * quantity)
        totalAmount: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ]);

  const totalAmount = ordersGroup[0]?.totalAmount || 0;

  return { totalPrice: totalAmount };
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addNewOrderToUser,
  getAllOrdersFromUser,
  getAllOrdersAmountFromUser,
};
