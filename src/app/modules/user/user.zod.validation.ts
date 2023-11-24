import { z } from 'zod';

const fullNameValidationSchema = z.object(
  {
    firstName: z
      .string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
      })
      .min(1, 'First name is required'),

    lastName: z
      .string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
      })
      .min(1, 'Last name is required'),
  },
  {
    required_error: 'Full name is required',
    invalid_type_error: 'Full name must be contain first name and last name',
  },
);

const addressValidationSchema = z.object(
  {
    street: z
      .string({
        required_error: 'Street is required',
        invalid_type_error: 'Street must be a string',
      })
      .min(1, 'Street is required'),

    city: z
      .string({
        required_error: 'City is required',
        invalid_type_error: 'City must be a string',
      })
      .min(1, 'City is required'),

    country: z
      .string({
        required_error: 'Country is required',
        invalid_type_error: 'Country must be a string',
      })
      .min(1, 'Country is required'),
  },
  {
    required_error: 'Address is required',
    invalid_type_error: 'Address must be contain street, city and country',
  },
);

export const orderValidationSchema = z.object(
  {
    productName: z
      .string({
        required_error: 'Product name is required',
        invalid_type_error: 'Product name must be a string',
      })
      .min(1, 'Product name is required'),

    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, 'Price must be greater than or equal to 0'),

    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .min(1, 'Quantity must be greater than or equal to 1'),
  },
  {
    required_error: 'Order is required',
    invalid_type_error:
      'Order must be contain product name, price and quantity',
  },
);

const userValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a positive integer',
    })
    .int()
    .positive(),

  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(1)
    .trim(),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .trim(),

  fullName: fullNameValidationSchema,

  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .int({ message: 'Age must be a integer number' })
    .positive({ message: 'Age must be a positive integer' }),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format')
    .min(1, 'Email is required')
    .trim(),

  isActive: z.boolean({
    required_error: 'Is active is required',
    invalid_type_error: 'Is active must be a boolean',
  }),

  hobbies: z
    .array(
      z.string({
        required_error: 'Hobbies is required',
        invalid_type_error: 'Hobbies must be an array of string',
      }),
      {
        required_error: 'Hobbies is required',
        invalid_type_error: 'Hobbies must be an array of string',
      },
    )
    .min(1, 'At least one hobby is required'),

  address: addressValidationSchema,

  orders: z.array(orderValidationSchema).default([]),
});

export default userValidationSchema;
