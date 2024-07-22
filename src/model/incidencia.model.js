/* eslint-disable camelcase */
import { pool } from '../config/db.js'

export const createIncidencia = async ({ id_usuario, asunto, descripcion, imagen, estado }) => {
  try {
    console.log('Creando incidencia con datos:', { id_usuario, asunto, descripcion, imagen, estado })
    const [result] = await pool.query(
      'INSERT INTO incidencias (id_usuario, asunto, descripcion, imagen, estado) VALUES (?, ?, ?, ?, ?)',
      [id_usuario, asunto, descripcion, imagen, estado]
    )
    console.log('Resultado de la inserción:', result)
    return result.insertId
  } catch (error) {
    console.error('Error al crear incidencia en la base de datos:', error)
    throw new Error(`Error al crear incidencia: ${error.message}`)
  }
}

export const findIncidenciasByUser = async (idUsuario) => {
  try {
    // Log para verificar el ID del usuario que se está buscando
    console.log('Buscando incidencias para el usuario con ID:', idUsuario)

    // Consulta SQL para seleccionar todas las columnas de incidencias y el id de usuario
    const query = `
        SELECT incidencias.*, usuarios.id AS id_usuario
        FROM incidencias
        JOIN usuarios ON incidencias.id_usuario = usuarios.id
        WHERE incidencias.id_usuario = ?
      `

    // Ejecución de la consulta con el pool de conexión
    const [rows] = await pool.query(query, [idUsuario])

    // Log para verificar el resultado de la consulta
    console.log('Resultado de la consulta SQL:', rows)

    return rows
  } catch (error) {
    console.error('Error en findIncidenciasByUser:', error)
    throw new Error(`Error al buscar incidencias por usuario: ${error.message}`)
  }
}

export const findAllIncidencias = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM incidencias')
    console.log('Resultado de la consulta SQL:', rows)
    return rows
  } catch (error) {
    console.error('Error en findAllIncidencias:', error)
    throw new Error(`Error al buscar todas las incidencias: ${error.message}`)
  }
}

export const updateIncidencia = async (id, { descripcion }) => {
  const query = 'UPDATE incidencias SET descripcion = ? WHERE id = ?'
  const values = [descripcion, id]
  await pool.execute(query, values)
}

export const deleteIncidencia = async (id) => {
  await pool.execute('DELETE FROM incidencias WHERE id = ?', [id]) // admin y usuario //
}

export const findIncidenciaId = async (id) => {
  const query = 'SELECT * FROM incidencias WHERE id = ?'
  const [rows] = await pool.execute(query, [id])
  return rows[0]
}

export const findIncidenciasByEstado = async (estado) => {
  const [rows] = await pool.query('SELECT * FROM incidencias WHERE estado = ?', [estado]) // admin
  return rows
}
