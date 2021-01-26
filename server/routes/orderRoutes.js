import express from 'express'
import {
  createOrder,
  getOrderById,
  updateOrderToPay,
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

export default router
