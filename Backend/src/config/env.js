import dotenv from 'dotenv'

dotenv.config()

const env = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  SERVER_HOST: process.env.SERVER_HOST || '0.0.0.0',
  SERVER_TIMEOUT: process.env.SERVER_TIMEOUT || '30s',

  MONGO_URI: 'mongodb+srv://juanixcopal:cCDTLXuw@cluster0.wuryrva.mongodb.net/',

  JWT_SECRET: process.env.JWT_SECRET || '05xkc6VM',
  JWT_EXPIRESIN: process.env.JWT_EXPIRESIN || '6h',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}

export default env
