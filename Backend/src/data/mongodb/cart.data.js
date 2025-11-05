export default function makeCartData({ Cart }) {
  return Object.freeze({ findCartByUser })

  async function findCartByUser(userId) {
    return Cart.find({ user_id: userId }).populate(
      'product_id',
      'name image price description stock'
    )
  }
}
