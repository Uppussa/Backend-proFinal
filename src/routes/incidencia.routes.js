import { Router } from 'express'
import { crearIncidencia, obtenerAllIncidencias, obtenerIncidencias, actualizarIncidencia, eliminarIncidencia, obtenerIncidenciasPorEstado } from '../controllers/incidencia.controllers.js'
import { authenticateTokenAndRole } from '../middlewares/authenticateToken.js'

const router = Router()

router.post('/create', crearIncidencia)
router.get('/', obtenerAllIncidencias)
router.get('/:id', obtenerIncidencias)
router.put('/:id', actualizarIncidencia)
router.delete('/:id', eliminarIncidencia)
router.get('/estado/:id', authenticateTokenAndRole('administrador'), obtenerIncidenciasPorEstado)

export default router
