import express from 'express'
import {
  authUser,
  createUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

// Public
router.post('/', createUser)
router.post('/login', authUser)

// Private
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)

// Admin
router.get('/', protect, admin, getUsers)
router.delete('/:id', protect, admin, deleteUser)
router.get('/:id', protect, admin, getUserById)
router.put('/:id', protect, admin, updateUser)

export default router
