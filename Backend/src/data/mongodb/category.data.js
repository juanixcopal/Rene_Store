export default function makeCategoryData({ Category }) {
    return Object.freeze({
      findAll,
      findByProductAndGender,
      create
    });
  
    async function findAll() {
      return Category.find();
    }
  
    async function findByProductAndGender(product, gender) {
      return Category.findOne({ product, gender });
    }
  
    async function create(product, gender) {
      
      const newCategory = new Category({ product, gender });
      return newCategory.save();
    }
  }
  