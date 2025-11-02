export default function makeProductData({ Product, Category }) {
  return Object.freeze({
    findAll,
    findByName,
    createProduct,
    findById
  });

  async function findAll() {
    return Product.find().populate("category_id", "product gender");
  }

  async function findByName(name) {
    return Product.findOne({ name }).populate("category_id", "product gender");
  }

  async function createProduct(params) {
    const { name, description, price, stock, image, categoryName, categoryGender } = params;

    const category = await Category.findOne({ product: categoryName, gender: categoryGender });
    if (!category) {
      throw new Error(`La categoría "${categoryName}" con género "${categoryGender}" no existe`);
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      image,
      category_id: category._id
    });

    return product.save();
  }

  async function findById(id) {
    return Product.findById(id).populate("category_id", "product gender");
  }
}
