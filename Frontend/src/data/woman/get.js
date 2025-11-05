import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsForWoman = async params => {
  return await instanceAPIRenielStore.get('/product/query/Mujer', {
    params,
    headers: {
      service: 'product-for-gender'
    }
  })
}

export const getProductsForWomanFootwear = async params => {
  return await instanceAPIRenielStore.get('/product/query/Mujer/Calzado', {
    params,
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForWomanBlouses = async params => {
  return await instanceAPIRenielStore.get('/product/query/Mujer/Blusas', {
    params,
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForWomanPants = async params => {
  return await instanceAPIRenielStore.get('/product/query/Mujer/Pantalones', {
    params,
    headers: {
      service: 'product-by-gender-category'
    }
  })
}
