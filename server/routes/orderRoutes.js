import express from 'express'
import {
  createOrder,
  getOrderById,
  updateOrderToPay,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/', protect, createOrder)
router.get('/', protect, admin, getAllOrders)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPay)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)

export default router
