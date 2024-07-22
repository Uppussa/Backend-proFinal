/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { SECRET_KEY } from '../config/config.js'
import { createIncidencia, findAllIncidencias, findIncidenciasByUser, updateIncidencia, deleteIncidencia, findIncidenciaId, findIncidenciasByEstado } from '../model/incidencia.model.js'
import { findUsuario } from '../model/usuario.model.js'
import upload from '../middlewares/upload.js'

export const crearIncidencia = async (req, res) => {
  upload.single('imagen')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Error en la carga de archivo' })
    } else if (err) {
      return res.status(500).json({ message: 'Error desconocido en la carga de archivo' })
    }

    try {
      // Obtener el token del encabezado de autorización
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó token de autorización' })
      }
      const token = authHeader.split(' ')[1]
      console.log('Token recibido:', token)

      const decodedToken = jwt.verify(token, SECRET_KEY)
      const email = decodedToken.email
      console.log('Email decodificado:', email)

      // Obtener el usuario a partir del email decodificado del token
      const usuario = await findUsuario(email)
      console.log('Usuario encontrado:', usuario)

      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      const { id } = usuario
      console.log('ID de Usuario:', id)

      // Obtener los datos de la incidencia del cuerpo de la solicitud
      const { asunto, descripcion, estado } = req.body
      const imagen = req.file ? req.file.path : null // Obtener la ruta del archivo si se subió uno
      console.log('Datos de la incidencia:', { asunto, descripcion, imagen, estado })

      // Crear la incidencia
      const incidenciaId = await createIncidencia({ id_usuario: id, asunto, descripcion, imagen, estado })
      console.log('Incidencia creada con ID:', incidenciaId)

      res.status(201).json({ message: 'Incidencia creada', id: incidenciaId })
    } catch (error) {
      console.error('Error en crearIncidencia:', error)
      res.status(500).json({ message: error.message })
    }
  })
}
export const obtenerAllIncidencias = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token de autorización' })
    }
    const token = authHeader.split(' ')[1]
    console.log('Token recibido:', token)

    const decodedToken = jwt.verify(token, SECRET_KEY)
    const email = decodedToken.email
    console.log('Email decodificado:', email)

    const usuario = await findUsuario(email)
    console.log('Usuario encontrado:', usuario)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Obtener todas las incidencias
    const incidencias = await findAllIncidencias()
    console.log('Incidencias encontradas:', JSON.stringify(incidencias, null, 2))

    if (incidencias.length === 0) {
      return res.status(200).json({ message: 'No se encontraron incidencias' })
    }

    res.status(200).json(incidencias)
  } catch (error) {
    console.error('Error en obtenerIncidencias:', error)
    res.status(500).json({ message: error.message })
  }
}

export const obtenerIncidencias = async (req, res) => {
  try {
    const id = req.params.id
    // console.log(id)
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token de autorización' })
    }
    const token = authHeader.split(' ')[1]
    // console.log('Token recibido:', token)

    const decodedToken = jwt.verify(token, SECRET_KEY)
    const email = decodedToken.email

    // console.log('Email decodificado:', email)
    // console.log('Rol decodificado:', rol)

    const usuario = await findUsuario(email)
    // console.log('Usuario encontrado:', usuario)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const incidencias = await findIncidenciasByUser(id)
    // console.log('Incidencias encontradas:', JSON.stringify(incidencias, null, 2))

    if (incidencias.length === 0) {
      return res.status(200).json({ message: 'No se encontraron incidencias para este usuario' })
    }

    res.status(200).json(incidencias)
  } catch (error) {
    console.error('Error en obtenerIncidencias:', error)
    res.status(500).json({ message: error.message })
  }
}

export const actualizarIncidencia = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token de autorización' })
    }
    const token = authHeader.split(' ')[1]
    console.log('Token recibido:', token)

    const decodedToken = jwt.verify(token, SECRET_KEY)
    const email = decodedToken.email
    console.log('Email decodificado:', email)

    const usuario = await findUsuario(email)
    console.log('Usuario encontrado:', usuario)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const { id } = req.params
    const { descripcion } = req.body

    if (!descripcion || descripcion.trim() === '') {
      return res.status(400).json({ message: 'No se proporcionó descripción para actualizar' })
    }

    await updateIncidencia(id, { descripcion })

    res.status(200).json({ message: 'Incidencia actualizada', id, descripcion })
  } catch (error) {
    console.error('Error en actualizarIncidencia:', error)
    res.status(500).json({ message: error.message })
  }
}

export const eliminarIncidencia = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token de autorización' })
    }
    const token = authHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const email = decodedToken.email

    const usuario = await findUsuario(email)
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const { id } = req.params
    const incidencia = await findIncidenciaId(id)
    if (!incidencia) {
      return res.status(404).json({ message: 'Incidencia no encontrada' })
    }

    await deleteIncidencia(id)
    res.status(200).json({ message: 'Incidencia eliminada' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const obtenerIncidenciasPorEstado = async (req, res) => {
  try {
    const { id } = req.params
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token de autorización' })
    }
    const token = authHeader.split(' ')[1]
    console.log('Token recibido:', token)

    const decodedToken = jwt.verify(token, SECRET_KEY)
    const email = decodedToken.email
    console.log('Email decodificado:', email)

    const usuario = await findUsuario(email)
    console.log('Usuario encontrado:', usuario)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    if (usuario.rol !== 'administrador') {
      return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden ver todas las incidencias' })
    }

    const incidencias = await findIncidenciasByEstado(id)
    console.log('Incidencias encontradas:', JSON.stringify(incidencias, null, 2))

    if (incidencias.length === 0) {
      return res.status(200).json({ message: 'No se encontraron incidencias' })
    }

    res.status(200).json(incidencias)
  } catch (error) {
    console.error('Error en obtenerIncidencias:', error)
    res.status(500).json({ message: error.message })
  }
}
