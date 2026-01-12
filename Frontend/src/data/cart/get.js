import { instanceAPIRenielStore, instanceAPIRenielStoreGraphql } from '../../config/data-source'

export const getProductsInCart = async () => {
  const response = await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      query {
        getCartProducts {
          _id
          quantity
          product_id {
            _id
            name
            image
            price
            description
            category_id {
              product
              gender
            }
          }
        }
      }
    `
  })

  // Devolver en el mismo formato que antes para no romper tu código
  return {
    data: response.data.data.getCartProducts
  }
}

export const getCartSummary = async () => {
  const response = await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      query {
        getCartSummary {
          items {
            id
            name
            subtotal
          }
          total
        }
      }
    `
  })

  return {
    data: response.data.data.getCartSummary
  }
}
