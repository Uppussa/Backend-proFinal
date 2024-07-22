import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'
import { findUsuario, createUsuario, updateUserProfile } from '../model/usuario.model.js'

export const crear = async (req, res) => {
  try {
    const { email, password, rol, piso, apartamento } = req.body

    // Validación de email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' })
    }
    // Validación de contraseña
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter.'
      })
    }
    // Verificar si el usuario ya existe
    const user = await findUsuario(email)
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)
    // Crear el usuario
    await createUsuario(email, hashedPassword, rol, piso, apartamento)

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validación de email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' })
    }
    const user = await findUsuario(email)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    const token = jwt.sign({ email: user.email, rol: user.rol }, SECRET_KEY, { expiresIn: '2h' })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const email = decodedToken.email
    const { nombre, telefono } = req.body

    console.log('Updating profile for:', email)
    console.log('New data:', { nombre, telefono })

    await updateUserProfile(email, { nombre, telefono })
    res.status(200).json({ message: 'Profile updated' })
  } catch (error) {
    console.error('Error in updateProfile function:', error.message)
    res.status(500).json({ message: error.message })
  }
}

export const me = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const email = decodedToken.email

    const user = await findUsuario(email)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
