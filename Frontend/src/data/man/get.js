import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsForMan = async () => {
  return await instanceAPIRenielStore.get('/product/query/Hombre', {
    headers: {
      service: 'product-for-gender'
    }
  })
}

export const getProductsForManFootwear = async () => {
  return await instanceAPIRenielStore.get('/product/query/Hombre/Calzado', {
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForManShirts = async () => {
  return await instanceAPIRenielStore.get('/product/query/Hombre/Camisas', {
    headers: {
      service: 'product-by-gender-category'
    }
  })
}

export const getProductsForManPants = async () => {
  return await instanceAPIRenielStore.get('/product/query/Hombre/Pantalones', {
    headers: {
      service: 'product-by-gender-category'
    }
  })
}
