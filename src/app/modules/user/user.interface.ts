import { Model } from 'mongoose';

export type TUser = {
  _id?: string;
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = { productName: string; price: number; quantity: number };

// For creating static method
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExist: (id: number) => Promise<TUser | null>;
}
