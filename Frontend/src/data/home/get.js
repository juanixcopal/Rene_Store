import { instanceAPIRenielStore } from '../../config/data-source'

export const get5ManProducts = async () => {
  return await instanceAPIRenielStore.get('/product/query', {
    headers: {
      service: '5-product-man'
    }
  })
}

export const get5WomanProducts = async () => {
  return await instanceAPIRenielStore.get('/product/query', {
    headers: {
      service: '5-product-woman'
    }
  })
}
