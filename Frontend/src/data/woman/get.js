import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsForWoman = async () => {
  return await instanceAPIRenielStore.get('/product/query/Mujer', {
    headers: {
      service: 'product-for-gender'
    }
  })
}

export const getProductsForWomanFootwear = async () => {
  return await instanceAPIRenielStore.get('/product/query/Mujer/Calzado', {
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForWomanBlouses = async () => {
  return await instanceAPIRenielStore.get('/product/query/Mujer/Blusas', {
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForWomanPants = async () => {
  return await instanceAPIRenielStore.get('/product/query/Mujer/Pantalones', {
    headers: {
      service: 'product-by-gender-category'
    }
  })
}
