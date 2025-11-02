import dotenv from 'dotenv'

dotenv.config()

const env = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  SERVER_HOST: process.env.SERVER_HOST || '0.0.0.0',
  SERVER_TIMEOUT: process.env.SERVER_TIMEOUT || '30s',

  MONGO_URI: 'mongodb://localhost:27017/renielstore',

  // MYSQL_PORT: process.env.MYSQL_PORT || 3306,
  // MYSQL_HOST: process.env.MYSQL_HOST || '0.0.0.0',
  // MYSQL_USER: process.env.MYSQL_USER || 'root',
  // MYSQL_PASS: process.env.MYSQL_PASS || 'root',
  // MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'invitapro',

  JWT_SECRET: process.env.JWT_SECRET || '05xkc6VM',
  JWT_EXPIRESIN: process.env.JWT_EXPIRESIN || '6h',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET

}

export default env
