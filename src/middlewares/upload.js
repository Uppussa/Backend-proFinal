import multer from 'multer'
import path from 'path'

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const nuevoNombre = `${Date.now()}-${file.originalname}`
    cb(null, nuevoNombre)
  }
})

// Filtro de archivos para permitir solo imágenes
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/
  const mimetype = filetypes.test(file.mimetype)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  if (mimetype && extname) {
    return cb(null, true)
  }
  cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png)'))
}

// Configuración de multer con el almacenamiento y el filtro de archivos
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limite de tamaño de archivo de 5MB
})

export default upload
