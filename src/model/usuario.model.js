import { pool } from '../config/db.js'

export const findUsuario = async (email) => {
  try {
    // console.log('Buscando usuario con email:', email)
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
    // console.log('Usuario encontrado:', rows[0])
    return rows[0]
  } catch (error) {
    console.error('Error al buscar usuario:', error)
    throw error
  }
}

export const createUsuario = async (email, password, rol, piso, apartamento) => {
  const [result] = await pool.query('INSERT INTO usuarios (email, password, rol, piso, apartamento) VALUES (?, ?, ?, ?, ?)', [email, password, rol, piso, apartamento])
  return result.insertId
}

export const updateUserProfile = async (email, { nombre, telefono }) => {
  const query = 'UPDATE usuarios SET nombre = ?, telefono = ? WHERE email = ?'
  const values = [nombre, telefono, email]
  await pool.execute(query, values)
}

export const me = async (email) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
  return rows[0]
}
