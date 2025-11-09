export default function makeProductData({ Product, Category, Cart }) {
  return Object.freeze({
    findAll,
    findByName,
    createProduct,
    findById,
    find,
    addToCart,
    softDelete
  })

  async function findAll() {
    return Product.find({ isDeleted: false }).populate('category_id', 'product gender')
  }

  async function findByName(name) {
    return Product.findOne({ name, isDeleted: false }).populate('category_id', 'product gender')
  }

  async function createProduct(params) {
    const { name, description, price, stock, image, idCategory } = params

    const product = new Product({
      name,
      description,
      price,
      stock,
      image,
      category_id: idCategory
    })

    return product.save()
  }

  async function findById(id) {
    return Product.findOne({ _id: id, isDeleted: false }).populate('category_id', 'product gender')
  }

  async function find(filter = {}, limit = null) {
    let productQuery = { isDeleted: false }

    if (filter.gender) {
      const categories = await Category.find({ gender: filter.gender })
      const categoryIds = categories.map(cat => cat._id)
      productQuery.category_id = { $in: categoryIds }
    }

    if (filter.categoryName) {
      const category = await Category.findOne({
        product: filter.categoryName,
        gender: filter.gender
      })
      productQuery.category_id = category ? category._id : null
    }

    let query = Product.find(productQuery).populate('category_id', 'product gender')
    if (limit) query = query.limit(limit)

    return query
  }

  async function addToCart(id, idProduct, qty = 1) {
    const existingItem = await Cart.findOne({ user_id: id, product_id: idProduct })

    if (existingItem) {
      existingItem.quantity += qty
      return existingItem.save()
    } else {
      const newItem = new Cart({ user_id: id, product_id: idProduct, quantity: qty })
      return newItem.save()
    }
  }

  async function softDelete(id) {
    const product = await Product.findById(id)
    if (!product) throw new Error('Producto no encontrado')

    product.isDeleted = true
    product.deletedAt = new Date()
    return product.save()
  }
}
