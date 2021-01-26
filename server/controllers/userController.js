import User from '../models/userModal.js'
import mongoose from 'mongoose'
import generateToken from '../utils/generateToken.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).send({
        message: 'Invalid email or password',
      })
    }
  } catch (error) {
    res.status(400).send({
      message: 'Error searching for user',
    })
  }
}

// @desc Register new user
// @route POST /api/users
// @access Public
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).send({ message: 'User already exist' })
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).send({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Error to create a new user' })
  }
}

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404).send({ message: 'User profile not found' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Error getting user profile' })
  }
}

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  try {
    const { _id } = req.user
    const user = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ message: 'User not found' })
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...user, _id },
      { new: true }
    )
    return res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).send({ message: 'Error updating user profile' })
  }
}

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({})

    if (users) {
      return res.status(200).json(users)
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Error getting all users' })
  }
}

// @desc Delete user
// @route GET /api/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      await user.remove()
      return res.status(200).send({ message: 'User removed' })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Error deleting user' })
  }
}

// @desc Edit user
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
      return res.status(200).send(user)
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Error searching for user' })
  }
}

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = async (req, res) => {
  try {
    const { id: _id } = req.params
    const user = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ message: 'User not found' })
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...user, _id },
      { new: true }
    )
    return res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).send({ message: 'Error updating user' })
  }
}

export {
  authUser,
  createUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
}
