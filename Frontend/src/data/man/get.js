import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsForMan = async params => {
  return await instanceAPIRenielStore.get('/product/query/Hombre', {
    params,
    headers: {
      service: 'product-for-gender'
    }
  })
}

export const getProductsForManFootwear = async params => {
  return await instanceAPIRenielStore.get('/product/query/Hombre/Calzado', {
    params,
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForManShirts = async params => {
  return await instanceAPIRenielStore.get('/product/query/Hombre/Camisas', {
    params,
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForManPants = async params => {
  return await instanceAPIRenielStore.get('/product/query/Hombre/Pantalones', {
    params,
    headers: {
      service: 'product-by-gender-category'
    }
  })
}
