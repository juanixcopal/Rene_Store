import { instanceAPIRenielStore } from '../../config/data-source'

export const get5ManProducts = async params => {
  return await instanceAPIRenielStore.get('/product/query', {
    params,
    headers: {
      service: '5-product-man'
    }
  })
}

export const get5WomanProducts = async params => {
  return await instanceAPIRenielStore.get('/product/query', {
    params,
    headers: {
      service: '5-product-woman'
    }
  })
}
