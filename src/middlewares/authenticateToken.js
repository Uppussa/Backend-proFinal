import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

export const authenticateTokenAndRole = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token de autorización' })
    }
    const token = authHeader.split(' ')[1]
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY)

      const { rol } = decodedToken
      if (rol !== requiredRole) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' })
      }
      req.usuario = decodedToken
      next()
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' })
    }
  }
}
