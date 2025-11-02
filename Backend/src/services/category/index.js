import { categoryData } from '../../data/index.js'

import makeCreateCategoryService from './create-category.service.js'
import makeAllCategoriesService from './all-categories.service.js'

const createCategoryService = makeCreateCategoryService({categoryData})
const allCategoriesService = makeAllCategoriesService({categoryData})

const categoryServices = {
    'create-category': createCategoryService,
    'all-categories': allCategoriesService
}

export default categoryServices