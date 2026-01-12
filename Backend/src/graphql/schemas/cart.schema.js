import { gql } from 'apollo-server-express'

export const cartTypeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    image: String
    price: Float!
    description: String
    category_id: Category
  }

  type Category {
    _id: ID!
    product: String
    gender: String
  }

  type CartItem {
    _id: ID!
    user_id: ID!
    product_id: Product!
    quantity: Int!
  }

  type CartSummaryItem {
    id: ID!
    name: String!
    subtotal: Float!
  }

  type CartSummary {
    items: [CartSummaryItem!]!
    total: Float!
  }

  type DecreaseProductResult {
    removed: Boolean!
    cartItem: CartItem
  }

  type OrderItem {
    product_id: ID!
    name: String!
    description: String
    image: String
    category: String
    gender: String
    quantity: Int!
    price: Float!
    subtotal: Float!
  }

  type Order {
    _id: ID!
    user_id: ID!
    items: [OrderItem!]!
    total: Float!
    createdAt: String
  }

  type Query {
    getCartProducts: [CartItem!]!
    getCartSummary: CartSummary!
  }

  type Mutation {
    decreaseProduct(productId: ID!): DecreaseProductResult!
    buyCart: Order!
  }
`
