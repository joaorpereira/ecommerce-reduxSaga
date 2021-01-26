import Order from '../models/orderModal.js'

// @desc Create new Order
// @route POST /api/orders
// @access Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400).send({ message: 'No order items' })
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    }
  } catch (error) {
    res.status(400).send({
      message: 'Error creating a order',
    })
  }
}

// @desc Get order by Id
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
      res.status(200).json(order)
    } else {
      res.status(400).send({
        message: 'Order not found',
      })
    }
  } catch (error) {
    res.status(400).send({
      message: 'Order not found',
    })
  }
}

// @desc Get order by Id
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPay = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.ṕaymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email: req.body.payer.email_address,
      }
      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
    } else {
      res.status(400).send({
        message: 'Order not updated',
      })
    }
  } catch (error) {
    res.status(400).send({
      message: 'Order not updated',
    })
  }
}

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).send({
      message: 'Orders not found',
    })
  }
}

// @desc Get logged in user orders
// @route GET /api/orders
// @access Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name')
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).send({
      message: 'Error searching for orders',
    })
  }
}

export { createOrder, getOrderById, updateOrderToPay, getMyOrders, getAllOrders }
