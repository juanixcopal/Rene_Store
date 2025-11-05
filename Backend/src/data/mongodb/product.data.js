export default function makeProductData({ Product, Category, Cart }) {
  return Object.freeze({
    findAll,
    findByName,
    createProduct,
    findById,
    find,
    addToCart
  })

  async function findAll() {
    return Product.find().populate('category_id', 'product gender')
  }

  async function findByName(name) {
    return Product.findOne({ name }).populate('category_id', 'product gender')
  }

  async function createProduct(params) {
    const { name, description, price, stock, image, categoryName, categoryGender } = params

    const category = await Category.findOne({ product: categoryName, gender: categoryGender })
    if (!category) {
      throw new Error(`La categoría "${categoryName}" con género "${categoryGender}" no existe`)
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      image,
      category_id: category._id
    })

    return product.save()
  }

  async function findById(id) {
    return Product.findById(id).populate('category_id', 'product gender')
  }

  async function find(filter = {}, limit = null) {
    let productQuery = {}

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
}
