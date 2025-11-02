import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.config.js'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'reniel_store/products', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
})

const uploadMiddleware = multer({ storage })

export default uploadMiddleware
