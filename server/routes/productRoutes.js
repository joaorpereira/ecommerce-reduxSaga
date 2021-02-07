import express from 'express'
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview
} from '../controllers/productsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', protect, admin, createProduct)
router.post('/:id/reviews', protect, createProductReview)
router.get('/:id', getSingleProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)

export default router
