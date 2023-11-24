import express from 'express';
import { UserController } from './user.controlelr';
const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

// Order routes
router.put('/:userId/orders', UserController.createOrder);
router.get('/:userId/orders', UserController.getAllOrders);
router.get('/:userId/orders/total-price', UserController.getOrdersAmount);

export const UserRoutes = router;
