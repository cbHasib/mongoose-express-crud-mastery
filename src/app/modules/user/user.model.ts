import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const orderSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
  },
  { _id: false },
);

const fullNameSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  { _id: false },
);

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, 'Full name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: [true, 'Is active is required'],
    },
    hobbies: {
      type: [String],
      required: false,
      default: [],
    },
    address: {
      type: addressSchema,
      required: [true, 'Address is required'],
    },
    orders: {
      type: [orderSchema],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Pre save middleware / hook : will run before save
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Check if user exist
userSchema.statics.isUserExist = async function (id: number) {
  return await this.findOne({ userId: id });
};

export const User = model<TUser, UserModel>('User', userSchema);
