export default function makeCartData({ Cart, Order }) {
  return Object.freeze({ findCartByUser, decreaseProduct, getCartSummary, createOrderFromCart })

  async function findCartByUser(userId) {
    return Cart.find({ user_id: userId }).populate({
      path: 'product_id',
      select: 'name image price description',
      populate: {
        path: 'category_id',
        select: 'product gender'
      }
    })
  }

  async function decreaseProduct(id, idProduct) {
    const cartItem = await Cart.findOne({ user_id: id, product_id: idProduct })

    if (cartItem.quantity === 1) {
      await Cart.deleteOne({ _id: cartItem._id })
      return { removed: true }
    } else {
      cartItem.quantity -= 1
      await cartItem.save()
      return { removed: false, cartItem }
    }
  }

  async function getCartSummary(userId) {
    const cartItems = await Cart.find({ user_id: userId }).populate({
      path: 'product_id',
      select: 'name price'
    })

    if (!cartItems.length) {
      return { items: [], total: 0 }
    }

    const items = cartItems.map(item => {
      const subtotal = item.quantity * item.product_id.price

      return {
        id: item.product_id._id,
        name: item.product_id.name,
        subtotal
      }
    })

    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    return { items, total }
  }

  async function createOrderFromCart(userId) {
    const cartItems = await Cart.find({ user_id: userId }).populate({
      path: 'product_id',
      populate: { path: 'category_id', select: 'product gender' },
      select: 'name description image price category_id'
    })

    if (!cartItems.length) {
      throw new Error('El carrito está vacío')
    }

    const items = cartItems.map(item => ({
      product_id: item.product_id._id,
      name: item.product_id.name,
      description: item.product_id.description,
      image: item.product_id.image,
      category: item.product_id.category_id?.product,
      gender: item.product_id.category_id?.gender,
      quantity: item.quantity,
      price: item.product_id.price,
      subtotal: item.quantity * item.product_id.price
    }))

    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    const order = new Order({
      user_id: userId,
      items,
      total
    })

    await order.save()

    await Cart.deleteMany({ user_id: userId })

    return order
  }
}
