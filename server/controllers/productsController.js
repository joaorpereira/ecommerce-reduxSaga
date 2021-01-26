import Product from '../models/productModal.js'
import mongoose from 'mongoose'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(400).send({
      message: 'Error searching for products',
    })
  }
}

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).send({
      message: 'Error: Product not found',
    })
  }
}

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      await product.remove()
      res.status(200).json({ message: 'Product removed' })
    } else {
      res.status(404).send({
        message: 'Error: Product not found',
      })
    }
  } catch (error) {
    res.status(404).send({
      message: 'Error: Product not deleted',
    })
  }
}

// @desc Create product
// @route POST /api/products
// @access Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample Description',
    })

    const createProduct = await product.save()
    res.status(201).json(createProduct)
  } catch (error) {
    res.status(404).send({
      message: 'Error: Product not created',
    })
  }
}

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { id: _id } = req.params
    const product = req.body
    console.log(product)
    console.log(_id)

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ message: 'Product not found' })
    }

    const updatedProduct = await Product.findByIdAndUpdate(_id, { ...product, _id }, { new: true })
    return res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(400).send({ message: 'Error updating product' })
  }
}

export { getAllProducts, getSingleProduct, deleteProduct, createProduct, updateProduct }
